import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file ? req.file.path : null;

    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description, category, stock } = req.body;
    if (req.file) product.image = req.file.path;
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.stock = stock;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
