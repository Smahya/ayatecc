"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";

export default function PaymentFailed() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <Text variant="h1" className="text-red-500 mb-4">
          Payment Failed
        </Text>
        <Text variant="body2" className="mb-8">
          We couldn't process your payment. Please try again or contact support
          if the problem persists.
        </Text>
        <Button onClick={() => router.push("/")} block>
          Try Again
        </Button>
      </div>
    </div>
  );
}
