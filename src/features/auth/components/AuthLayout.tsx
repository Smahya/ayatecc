"use client";
import React from "react";

import Image from "next/image";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white pt-10 pb-12">
      <Image
        src="/signal.png"
        alt="auth-bg"
        width={200}
        height={150}
        className="mx-auto"
      />
      <div className="grid gap-4 bg-white mt-6 mx-auto w-[540px] h-max max-w-[95vw] rounded-2xl shadow-custom border border-neutral-200 overflow-hidden">
        {children}
      </div>

      {/* <div className="gap-1.5 bg-neutral-50 absolute bottom-0 left-0 right-0 py-2">
        <p className="text-center">System by SALMA</p>
        <p className="text-center">Contact: +233553018297</p>
      </div> */}
    </div>
  );
}
