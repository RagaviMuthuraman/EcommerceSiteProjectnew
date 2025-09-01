import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, "uploads/"); },
  filename(req, file, cb) { cb(null, Date.now() + "-" + file.originalname); },
});
const upload = multer({ storage });

// Public: get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Protected routes
router.post("/", protect, upload.single("image"), async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file?.path;
  const newProduct = await Product.create({ name, description, price, stock, category, image });
  res.status(201).json(newProduct);
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file?.path;
  const updated = await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock, category, ...(image && { image }) }, { new: true });
  res.json(updated);
});

router.delete("/:id", protect, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
