// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const navigate = useNavigate();
  const userId = "user123"; // replace with real user id

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]); // ✅ refetch whenever search or category changes

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/${userId}`, {
        productId: product._id,
        quantity: 1,
      });
      alert("✅ Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Failed to add to cart");
    }
  };

  const handleBuyNow = (product) => {
    navigate(`/order?productId=${product._id}&quantity=1`);
  };

  // Filter products based on search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "10px" }}>
      <h2>Products {searchTerm && `- "${searchTerm}"`} {category !== "All" && `(${category})`}</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: "220px",
              }}
            >
              {product.image && (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              )}
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category || "N/A"}</p>
              {product.stock !== undefined && <p>Stock: {product.stock}</p>}
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: "6px 10px",
                  marginRight: "5px",
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                style={{
                  padding: "6px 10px",
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
