"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function PaymentFailed() {
  const router = useRouter();

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
                className="w-4 h-4 text-danger"
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
                  d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-medium text-ink-60">
                Payment not completed
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1">
              Payment didn&apos;t go through
            </h1>
            <p className="text-sm text-ink-60 mb-7">
              No charge was made. This usually happens when the card is
              declined, the network drops, or the session times out. Try again —
              it normally works the second time.
            </p>

            <div className="grid gap-2 pt-1">
              <Button block onClick={() => router.push("/")}>
                Try again
              </Button>
              <p className="text-center text-xs text-mute mt-1">
                Still stuck? Call{" "}
                <span className="font-medium text-ink">0244-197-207</span>
              </p>
            </div>
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
