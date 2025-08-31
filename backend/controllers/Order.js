import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: Number,
  address: String,
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
