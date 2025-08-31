import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; // make sure this path is correct

const categories = ["All", "Books", "Fashion", "Electronics"];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null); // store Google user info

  const navigate = useNavigate();
  const userId = "user123"; // replace with real user ID

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartCount(data.products.length);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}&category=${category}`);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome ${result.user.displayName}`);
      // Optional: save user info in localStorage or context
    } catch (error) {
      console.error(error.message);
      alert("Google login failed!");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#1f2937",
        color: "#fff",
        flexWrap: "wrap",
      }}
    >
      {/* Left Links */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        {/* Google Login Button */}
        {!user ? (
          <button
            onClick={handleGoogleLogin}
            style={{
              background: "#fff",
              color: "#1f2937",
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login with Google
          </button>
        ) : (
          <span style={{ color: "#fff" }}>Hi, {user.displayName}</span>
        )}
      </div>

      {/* Center Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Right Links */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link
          to="/cart"
          style={{ color: "#fff", textDecoration: "none", position: "relative" }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                color: "#fff",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
          Admin
        </Link>
         <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>Products</Link>
      </div>
    </nav>
  );
};

export default Navbar;
