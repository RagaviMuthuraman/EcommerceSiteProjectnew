import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", stock: 0, category: "Books", image: null });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== id));
      alert("🗑️ Product deleted!");
    } catch (err) { console.error(err); alert("Failed to delete"); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in newProduct) {
        if (newProduct[key]) formData.append(key, newProduct[key]);
      }

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });

      alert("✅ Product added!");
      setNewProduct({ name: "", price: "", description: "", stock: 0, category: "Books", image: null });
      fetchProducts();
    } catch (err) { console.error(err); alert("Failed to add product"); }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
        <input name="price" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
        <textarea name="description" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
        <input type="file" onChange={e => setNewProduct({ ...newProduct, image: e.target.files[0] })} />
        <button type="submit">Add Product</button>
      </form>

      <h3>Products List</h3>
      {products.map(p => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
