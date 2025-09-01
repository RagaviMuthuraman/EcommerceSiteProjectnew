import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Processing" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
