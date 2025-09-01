import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/:userId", protect, placeOrder);
router.get("/:userId", protect, getOrders);

export default router;
