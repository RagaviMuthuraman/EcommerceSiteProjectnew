// frontend/src/components/HomePage.jsx
import React from "react";
import BannerCarousel from "./BannerCarousel";
import OfferSection from "./OfferSection";

// ✅ Make sure these images exist inside src/assets/
import electronicsImg from "../assets/laptop.jpg";
import fashionImg from "../assets/fashion.jpg";
import booksImg from "../assets/combo book.png";
import toysImg from "../assets/toys.jpg";

const categories = [
  { name: "Electronics", image: electronicsImg },
  { name: "Fashion", image: fashionImg },
  { name: "Books", image: booksImg },
  { name: "Toys", image: toysImg },
];

function HomePage() {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f5f2ff", // Light royal purple background
      }}
    >
      {/* 🔹 Page Heading */}
      <h1
        style={{
          textAlign: "center",
          color: "#4c1d95", // Royal Purple
          fontWeight: "bold",
          marginBottom: "30px",
          fontSize: "2.2rem",
        }}
      >
        Welcome to Our Store
      </h1>

      {/* 🔹 Categories Grid */}
      <h2
        style={{
          margin: "20px 0",
          fontWeight: "bold",
          textAlign: "center",
          color: "#6b21a8",
        }}
      >
        Shop by Category
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div
              style={{
                padding: "12px 0",
                background: "#ede9fe",
                fontWeight: "bold",
                color: "#4c1d95",
              }}
            >
              {cat.name}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Banner Carousel */}
      <div style={{ marginBottom: "50px" }}>
        <BannerCarousel />
      </div>

      {/* 🔹 Offers Section */}
      <div style={{ marginBottom: "50px" }}>
        <OfferSection />
      </div>
    </div>
  );
}

export default HomePage;
