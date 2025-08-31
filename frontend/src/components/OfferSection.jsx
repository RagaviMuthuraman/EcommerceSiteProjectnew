import React from "react";
import laptop from "../assets/laptop.jpg";
import headphone from "../assets/headphone.jpg";
import shoes from "../assets/shoe.jpg";
import shirt from "../assets/shirt.jpeg";
import novel from "../assets/youcanbook.png";
import notebook from "../assets/NOTEBOOK.jpg";
import floraldress from "../assets/floraldress.png";
import formal from "../assets/formal.png";

// Offers data
const offers = [
  {
    category: "Electronics",
    products: [
      { name: "Headphone", img: headphone, link: "/electronics/headphone" },
      { name: "Laptop", img: laptop, link: "/electronics/laptop" },
      { name: "Shoes", img: shoes, link: "/electronics/shoes" }, // extra product
      { name: "Shirt", img: shirt, link: "/electronics/shirt" }, // extra product
    ],
  },
  {
    category: "Fashion",
    products: [
      { name: "Shirt", img: shirt, link: "/fashion/shirt" },
      { name: "Floraldress", img: floraldress, link: "/fashion/floraldress" },
      { name: "formal", img: formal, link: "/fashion/formal" },
      { name: "Shoes", img: shoes, link: "/fashion/shoes" },
    ],
  },
  {
    category: "Books",
    products: [
      { name: "Novel", img: novel, link: "/books/novel" },
      { name: "Notebook", img: notebook, link: "/books/notebook" },
      { name: "Shoes", img: shoes, link: "/books/shoes" },
      { name: "Shirt", img: shirt, link: "/books/shirt" },
    ],
  },
];

function OfferSection() {
  return (
    <div style={{ marginTop: "20px" }}>
      {offers.map((offer, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            overflow: "hidden",
            padding: "16px",
          }}
        >
          {/* Category Title */}
          <h2 style={{ marginBottom: "16px", textAlign: "center" }}>
            {offer.category} Offers
          </h2>

          {/* Products */}
          <div style={{ display: "flex", gap: "16px" }}>
            {offer.products.map((p, i) => (
              <a
                key={i}
                href={p.link}
                style={{
                  flex: 1,
                  textAlign: "center",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "8px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "contain",
                  }}
                />
                <p style={{ marginTop: "8px", fontWeight: "bold" }}>{p.name}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferSection;
