import Cart from "../models/Cart.js";

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      cart = await Cart.create({ user: req.params.userId, products: [{ product: productId, quantity }] });
    } else {
      const exists = cart.products.find((p) => p.product.toString() === productId);
      if (exists) {
        exists.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("products.product");
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    cart.products = cart.products.filter((p) => p.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
