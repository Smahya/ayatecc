"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <Text variant="h1" className="text-green-500 mb-4">
          Payment Successful!
        </Text>
        <Text variant="body2" className="mb-8">
          Thank you for your payment. Your payment has been completed
          successfully.
        </Text>
        <Button onClick={() => router.push("/")} block>
          Return to Home
        </Button>
      </div>
    </div>
  );
}
