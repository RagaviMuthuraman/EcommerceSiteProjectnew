import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number,
  image: String,
});

export default mongoose.model("Products", productSchema);
