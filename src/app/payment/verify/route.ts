import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "No reference provided" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;

    if (status === true && data?.status === "success") {
      const amountGhs = data.amount ? Math.round(data.amount / 100) : 0;
      const url = new URL("/payment/success", request.url);
      url.searchParams.set("reference", reference);
      if (amountGhs) url.searchParams.set("amount", String(amountGhs));
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/payment/failed", request.url));
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.redirect(new URL("/payment/failed", request.url));
  }
}
