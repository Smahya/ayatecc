"use client";

import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-canvas flex flex-col">
      <header className="mx-auto w-full max-w-6xl px-6 sm:px-10 pt-8 pb-4">
        <span className="text-lg font-semibold tracking-tighter text-ink">
          ayatecc
        </span>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 sm:px-10 py-6 sm:py-10 flex justify-center">
        <div className="w-full max-w-[480px] bg-paper rounded-2xl border border-mute-line shadow-card overflow-hidden animate-fade-up self-start">
          <div className="px-7 sm:px-9 py-8 sm:py-10">{children}</div>
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
