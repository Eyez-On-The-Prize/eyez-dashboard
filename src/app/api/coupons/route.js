import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/Coupon";  // ✅ Fixed model import

// GET all coupons
export async function GET() {
  await dbConnect();
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}

// PUT - Update coupon status
// export async function PUT(req) {
//   await dbConnect();
//   try {
//     let body;
//     try {
//       body = await req.json();
//     } catch (error) {
//       return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
//     }

//     const { id, status } = body;
//     if (!id) {
//       return NextResponse.json({ error: "Coupon ID is required" }, { status: 400 });
//     }

//     const updatedCoupon = await Coupon.findByIdAndUpdate(id, { status }, { new: true });

//     if (!updatedCoupon) {
//       return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Status updated successfully", data: updatedCoupon }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating coupon status:", error);
//     return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
//   }
// }
