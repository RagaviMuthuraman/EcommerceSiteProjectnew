import Order from "../models/Order.js";

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const order = await Order.create({ user: req.params.userId, products, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
