import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", protect, getCart);
router.post("/:userId", protect, addToCart);
router.delete("/:userId/:productId", protect, removeFromCart);

export default router;
