import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add product to cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body; // product has productId, name, price, quantity
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [product] });
    } else {
      // check if product exists
      const index = cart.products.findIndex(p => p.productId === product.productId);
      if (index >= 0) {
        cart.products[index].quantity += product.quantity;
      } else {
        cart.products.push(product);
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cart for user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
