import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userId = "user123";

const CartPage = () => {
  const [cart, setCart] = useState({ products: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedProducts = cart.products.filter(p => p.productId !== productId);
      await axios.post(`http://localhost:5000/api/cart/add`, { userId, product: updatedProducts });
      setCart({ products: updatedProducts });
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  const checkout = () => {
    navigate("/order", { state: { products: cart.products } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>
      {cart.products.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {cart.products.map(p => (
            <div key={p.productId} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <p>Quantity: {p.quantity}</p>
              <button onClick={() => removeFromCart(p.productId)}>Remove</button>
            </div>
          ))}
          <button onClick={checkout} style={{ marginTop: "10px", padding: "10px 20px" }}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
