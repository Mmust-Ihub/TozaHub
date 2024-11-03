import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    number_plate: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["success", "failed"],
      trim: true,
    },
    narrative: {
      type: String,
      required: true,
      default: "Tax",
      trim: true,
    },
    trans_type: {
      type: String,
      required: true,
      default: "PAYOUT",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const transactionModel = mongoose.model("Transaction", transactionSchema);
