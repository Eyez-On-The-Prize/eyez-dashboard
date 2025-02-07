import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    discountCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false, // false means 'unused', true means 'used'
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent model recompilation
export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
