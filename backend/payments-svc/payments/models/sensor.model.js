import mongoose from "mongoose";
import validator from "validator";

const sensorSchema = mongoose.Schema(
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    number_plate: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
      default: "Kakamega",
    },
  },
  {
    timestamps: true,
  }
);

export const sensorModel = mongoose.model("Sensor", sensorSchema);
