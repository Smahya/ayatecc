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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status } = response.data;

    if (status === true) {
      // Payment was successful
      // Here you can update your database, send emails, etc.
      return NextResponse.redirect(new URL("/payment/success", request.url));
    } else {
      // Payment failed
      return NextResponse.redirect(new URL("/payment/failed", request.url));
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.redirect(new URL("/payment/failed", request.url));
  }
}
