import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = ["All", "Books", "Fashion", "Electronics"];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false); // check admin login

  const navigate = useNavigate();

  // Check token in localStorage to detect admin login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAdminLoggedIn(true);

    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const userId = "user123"; // replace with real user ID
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

  const handleAdminLogout = () => {
    localStorage.removeItem("token"); // remove token
    setAdminLoggedIn(false);
    navigate("/login"); // redirect to login page
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

        {adminLoggedIn ? (
          <>
            <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
              Admin
            </Link>
            <button
              onClick={handleAdminLogout}
              style={{
                background: "red",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              background: "#fff",
              color: "#1f2937",
              padding: "6px 12px",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
