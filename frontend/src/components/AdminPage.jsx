import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["Books", "Fashion", "Electronics", "Other"];

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "Books",
    stock: 0, // ✅ added stock
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("❌ Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("stock", newProduct.stock); // ✅ include stock
      if (newProduct.image) formData.append("image", newProduct.image);

      const { data } = editingProduct
        ? await axios.put(
            `http://localhost:5000/api/products/${editingProduct._id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
        : await axios.post("http://localhost:5000/api/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      alert(editingProduct ? "✅ Product updated!" : "✅ Product added!");

      // Update local state automatically
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === data._id ? data : p))
        );
      } else {
        setProducts((prev) => [data, ...prev]);
      }

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: null,
        category: "Books",
        stock: 0, // ✅ reset stock
      });
      setEditingProduct(null);
    } catch (err) {
      console.error("Error adding/updating product:", err);
      alert("❌ Failed to add/update product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("🗑️ Product deleted!");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("❌ Failed to delete product");
      }
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
      category: product.category || "Books",
      stock: product.stock || 0, // ✅ set stock in edit
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          {editingProduct ? "Update" : "Add"} Product
        </button>
      </form>

      <hr />

      <h3>Products List</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid gray",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p> {/* ✅ display stock */}
            <p>{p.description}</p>
            <p>Category: {p.category || "N/A"}</p>
            {p.image && (
              <img
                src={`http://localhost:5000/${p.image}`}
                alt={p.name}
                width="120"
                style={{ display: "block", marginBottom: "10px" }}
              />
            )}
            <button
              onClick={() => handleEdit(p)}
              style={{ marginRight: "10px", padding: "5px 10px" }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(p._id)}
              style={{ padding: "5px 10px" }}
            >
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
