import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const base = process.env.NEXT_PUBLIC_PAYSTACK_BASE_URL;

  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured: missing PAYSTACK_SECRET_KEY" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const phone: string | undefined = body?.phone;
  const email: string | undefined = body?.email;
  const amountGhs: number | undefined = body?.amount;

  if (!phone || typeof amountGhs !== "number" || amountGhs <= 0) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const fallbackEmail = process.env.PAYSTACK_FALLBACK_EMAIL;
  if (!email && !fallbackEmail) {
    return NextResponse.json(
      {
        error:
          "Server misconfigured: set PAYSTACK_FALLBACK_EMAIL or require an email at the form level",
      },
      { status: 500 }
    );
  }
  const payerEmail = email && email.length > 0 ? email : fallbackEmail!;

  const origin = request.headers.get("origin") || new URL(request.url).origin;

  try {
    const response = await axios.post(
      `${base}/transaction/initialize`,
      {
        email: payerEmail,
        amount: amountGhs * 100,
        callback_url: `${origin}/payment/verify`,
        metadata: {
          phone,
          custom_fields: [
            {
              display_name: "Payment For",
              variable_name: "payment_for",
              value: "Data Voucher",
            },
            {
              display_name: "Phone Number",
              variable_name: "phone",
              value: phone,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      authorization_url: response.data.data.authorization_url,
      access_code: response.data.data.access_code,
      reference: response.data.data.reference,
    });
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Failed to initialize payment";
    console.error("Paystack initialize error:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
