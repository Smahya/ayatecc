"use client";

import { Button } from "@/components/Button";
import { findPackageByAmount } from "@/lib/packages";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function formatCode(raw: string) {
  const padded = raw.replace(/[^a-z0-9]/gi, "").toUpperCase().padEnd(12, "X");
  return `${padded.slice(0, 4)}-${padded.slice(4, 8)}-${padded.slice(8, 12)}`;
}

function PaymentSuccessInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [copied, setCopied] = useState(false);

  const reference = search.get("reference") || "";
  const amountGhs = Number(search.get("amount")) || 0;
  const pkg = amountGhs ? findPackageByAmount(amountGhs) : undefined;

  const code = useMemo(
    () => (reference ? formatCode(reference) : ""),
    [reference]
  );
  const refTail = reference ? reference.slice(-4).toUpperCase() : "—";

  if (!reference) {
    return (
      <div className="min-h-screen w-full bg-canvas flex flex-col">
        <header className="mx-auto w-full max-w-6xl px-6 sm:px-10 pt-8">
          <span className="text-lg font-semibold tracking-tighter text-ink">
            ayatecc
          </span>
        </header>
        <main className="flex-1 mx-auto w-full max-w-[480px] px-6 sm:px-0 flex items-center py-12">
          <div className="w-full bg-paper rounded-2xl border border-mute-line shadow-card overflow-hidden animate-fade-up">
            <div className="px-7 sm:px-9 py-8 sm:py-10">
              <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1">
                No receipt found
              </h1>
              <p className="text-sm text-ink-60 mb-7">
                We can&apos;t find a payment reference for this page. Start a new
                purchase to buy a voucher.
              </p>
              <Button block onClick={() => router.push("/")}>
                Buy a voucher
              </Button>
            </div>
          </div>
        </main>
        <footer className="mx-auto w-full max-w-6xl px-6 sm:px-10 pb-10 pt-2 flex items-center justify-between">
          <p className="text-xs text-mute">
            © Ayatecc {new Date().getFullYear()}
          </p>
          <p className="text-xs text-mute">Secured by Paystack</p>
        </footer>
      </div>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-canvas flex flex-col">
      <header className="mx-auto w-full max-w-6xl px-6 sm:px-10 pt-8">
        <span className="text-lg font-semibold tracking-tighter text-ink">
          ayatecc
        </span>
      </header>

      <main className="flex-1 mx-auto w-full max-w-[480px] px-6 sm:px-0 flex items-center py-12">
        <div className="w-full bg-paper rounded-2xl border border-mute-line shadow-card overflow-hidden animate-fade-up">
          <div className="px-7 sm:px-9 py-8 sm:py-10">
            <div className="flex items-center gap-2 mb-7">
              <svg
                className="w-4 h-4 text-success"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M5 8.25L7 10.25L11 6.25"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium text-ink-60">
                Payment complete
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1">
              Your voucher code
            </h1>
            <p className="text-sm text-ink-60 mb-6">
              Copy the voucher code below.
            </p>

            <div className="rounded-lg border border-mute-line bg-canvas px-4 py-4 mb-6">
              <p className="font-mono tabular text-xl sm:text-2xl text-ink select-all break-all leading-tight">
                {code}
              </p>
              <button
                type="button"
                onClick={copy}
                className="mt-2 text-xs font-medium text-accent hover:text-accent-dark transition-colors"
              >
                {copied ? "Copied ✓" : "Copy code"}
              </button>
            </div>

            <div className="grid gap-2.5 text-sm mb-7">
              <div className="flex items-center justify-between">
                <span className="text-mute">Amount</span>
                <span className="text-ink tabular">
                  {amountGhs ? `GH₵${amountGhs}.00` : "—"}
                </span>
              </div>
              {pkg && (
                <div className="flex items-center justify-between">
                  <span className="text-mute">Bundle</span>
                  <span className="text-ink">
                    {pkg.data} · {pkg.validity}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-mute">Reference</span>
                <span className="text-ink font-mono tabular text-xs">
                  #{refTail}
                </span>
              </div>
            </div>

            <Button block onClick={() => router.push("/")}>
              Buy another
            </Button>
          </div>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 sm:px-10 pb-10 pt-2 flex items-center justify-between">
        <p className="text-xs text-mute">
          © Ayatecc {new Date().getFullYear()}
        </p>
        <p className="text-xs text-mute">Secured by Paystack</p>
      </footer>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
