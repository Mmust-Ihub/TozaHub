import mongoose from "mongoose";
import validator from "validator";

const walletSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    wallet_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    currency: {
      type: String,
      enum: ["KES", "USD", "EUR", "GBP"],
      default: "KES",
      trim: true,
    },
    wallet_type: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    can_disburse: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const walletModel = mongoose.model("Wallet", walletSchema);
