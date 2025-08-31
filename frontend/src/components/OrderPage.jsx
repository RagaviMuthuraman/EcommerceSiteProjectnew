import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const userId = "user123";

const OrderPage = () => {
  const { state } = useLocation();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  if (!state || !state.products) {
    return <p>No products to order.</p>;
  }

  const totalAmount = state.products.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/order/place", {
        userId,
        products: state.products,
        totalAmount,
        address,
      });
      alert("✅ Order placed!");
      navigate("/products");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Confirmation</h2>
      <div>
        {state.products.map(p => (
          <div key={p.productId || p._id}>
            <p>{p.name} x {p.quantity || 1} - ₹{p.price * (p.quantity || 1)}</p>
          </div>
        ))}
        <p>Total: ₹{totalAmount}</p>
      </div>

      <textarea
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button onClick={placeOrder} style={{ padding: "10px 20px" }}>Pay & Confirm</button>
    </div>
  );
};

export default OrderPage;
