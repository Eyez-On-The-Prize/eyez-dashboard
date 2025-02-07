import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/Coupon";

export async function PUT(req) {
  await dbConnect();
  try {
    const { id, status } = await req.json();

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedCoupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status updated successfully", data: updatedCoupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}
