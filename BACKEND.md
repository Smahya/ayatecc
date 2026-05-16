# Backend & Voucher Delivery Plan

Status: planning. This document captures the API contract and architecture needed to move from "Paystack-payment-only" to a real voucher business with delivery.

## Current state ✅

The Next.js app already runs server-side code via `route.ts` files. There is no separate backend service.

| Endpoint | Caller | Purpose |
| --- | --- | --- |
| `POST /api/payment/initialize` | Browser | Calls Paystack with `PAYSTACK_SECRET_KEY`, returns `access_code` for the inline modal |
| `GET /payment/verify?reference=…` | Browser (Paystack redirect) | Re-verifies the transaction with Paystack, redirects to `/payment/success` or `/payment/failed` |

Secrets live server-side only. `NEXT_PUBLIC_PAYSTACK_BASE_URL` is public; `PAYSTACK_SECRET_KEY` and `PAYSTACK_FALLBACK_EMAIL` are server-only.

## What's missing

Right now the success page synthesizes a fake voucher code from the Paystack reference. To deliver a real product we need:

1. **A database** to persist orders and voucher inventory
2. **A Paystack webhook handler** as the authoritative "payment succeeded → issue voucher" trigger
3. **A `GET /api/voucher/[reference]` endpoint** the success page can poll for the issued code
4. **(Optional) SMS delivery** via Hubtel / Arkesel / Twilio so users get the code on their phone

## Architecture

### Order lifecycle

```
1. User picks bundle, fills form          → browser POSTs /api/payment/initialize
2. Server creates Order(status=pending)    → calls Paystack, returns access_code
3. Browser opens Paystack modal            → user pays
4. Paystack redirects to /payment/verify   → browser sees success page (instant UX)
5. Paystack POSTs /api/paystack/webhook    → server marks order paid, reserves voucher, sends SMS
6. Success page polls /api/voucher/[ref]   → renders real code once webhook is done
```

The webhook is the source of truth. The redirect-based verify exists only so the user sees the success page immediately; it does not affect whether the order is fulfilled.

### Why both verify and webhook?

| Concern | `/payment/verify` (redirect) | `/api/paystack/webhook` (server-to-server) |
| --- | --- | --- |
| Fires every time? | Only if the browser comes back | Always — even if user closes the tab |
| Trustworthy? | Re-verifies with Paystack secret, so yes | HMAC-signed by Paystack, so yes |
| Used for? | UX — showing the success page | Correctness — actually issuing the voucher |

## API contract

### `GET /api/voucher/[reference]`

Called from the success page in a polling loop until status is `issued` or `not_found`.

**Pending (webhook hasn't run yet)**
```json
{ "status": "pending" }
```

**Issued**
```json
{
  "status": "issued",
  "code": "K7M3-X29A-PL4Q-BX82",
  "amount": 25,
  "data": "3 GB",
  "validity": "30 days"
}
```

**Not found / payment never completed**
```json
{ "status": "not_found" }
```

Success-page polling shape (already drafted):

```ts
const { data } = useQuery({
  queryKey: ["voucher", reference],
  queryFn: () => fetch(`/api/voucher/${reference}`).then((r) => r.json()),
  refetchInterval: (q) => (q.state.data?.status === "issued" ? false : 2000),
  enabled: !!reference,
});
```

### `POST /api/paystack/webhook`

Receives every Paystack event. Must:

1. Read the raw request body (before any JSON parsing)
2. Verify the `x-paystack-signature` header is `HMAC-SHA512(body, PAYSTACK_SECRET_KEY)`
3. Reject (return 401) if signature does not match — this prevents anyone from posting fake "success" events
4. Switch on `event` field of the JSON body:
   - `charge.success` → look up order by `data.reference`, mark paid, reserve a voucher code, send SMS
   - others → log and ignore for now
5. Return 200 within ~10 seconds. Paystack retries up to 72 hours on non-2xx.

## Data model (Postgres via Prisma)

```prisma
model Order {
  id            String   @id @default(cuid())
  reference     String   @unique          // Paystack reference
  phone         String
  email         String?
  amountGhs     Int                       // GHS (not pesewas)
  bundleData    String                    // e.g. "3 GB"
  bundleValid   String                    // e.g. "30 days"
  status        OrderStatus @default(pending)
  voucherCodeId String?  @unique
  voucherCode   VoucherCode? @relation(fields: [voucherCodeId], references: [id])
  createdAt     DateTime @default(now())
  paidAt        DateTime?
  fulfilledAt   DateTime?
}

enum OrderStatus { pending paid fulfilled failed }

model VoucherCode {
  id         String  @id @default(cuid())
  code       String  @unique             // 16-char string with dashes
  amountGhs  Int
  bundleData String
  bundleValid String
  status     VoucherStatus @default(available)
  order      Order?
  createdAt  DateTime @default(now())
  soldAt     DateTime?
}

enum VoucherStatus { available reserved sold }
```

### Voucher generation

A small CLI / seed script that generates N random 16-char codes per bundle tier and inserts them with `status=available`. Run periodically as inventory depletes, or pre-seed a few thousand.

Code format suggestion: `XXXX-XXXX-XXXX-XXXX` where each X is from `A-Z2-9` (excluding `0`, `O`, `1`, `I` for legibility).

## Open questions

- **DB host**: Neon, Supabase, Vercel Postgres, or self-hosted? Neon free tier is recommended for now.
- **SMS provider**: Hubtel (best for Ghana), Arkesel, or Twilio? Pricing differs significantly for GH numbers.
- **What happens if inventory runs out?** Webhook should mark the order `paid` but not `fulfilled`, and alert someone to refill stock. The customer's payment is still good — they're owed a voucher.
- **Refund / dispute path**: Paystack supports refunds via API. Out of scope for v1 but worth thinking about.

## Implementation order when we're ready

1. Set up Neon (or chosen Postgres host), add `DATABASE_URL` to `.env.local`
2. Install Prisma, write the schema above, run `prisma migrate dev`
3. Write a seed script that inserts ~50 voucher codes per bundle tier (enough for initial testing)
4. Update `/api/payment/initialize` to create an `Order` row before calling Paystack
5. Build `POST /api/paystack/webhook` — signature verify + `charge.success` handler that reserves a voucher and updates the order
6. Build `GET /api/voucher/[reference]` — returns the order + code if fulfilled
7. Update `/payment/success` to poll the new endpoint and render the real code
8. Add SMS sending in the webhook handler (after voucher is reserved, before marking `fulfilled`)
9. Configure webhook URL in Paystack dashboard (test mode first, via ngrok)

## Local webhook testing

Paystack can't reach `localhost`. Use one of:

- `ngrok http 3000` → paste the `https://*.ngrok-free.app` URL into Paystack dashboard's webhook field
- `cloudflared tunnel --url http://localhost:3000` → same idea, different provider

Then trigger a real test payment, or use Paystack dashboard's "Send test webhook" button.
