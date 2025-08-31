import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/place", async (req, res) => {
  const { userId, products, totalAmount, address } = req.body;
  try {
    const order = new Order({ userId, products, totalAmount, address, status: "Pending" });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
