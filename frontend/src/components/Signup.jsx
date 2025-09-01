import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      alert("✅ Signup successful!");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" name="name" value={form.name} onChange={handleChange} required/>
        <input placeholder="Email" type="email" name="email" value={form.email} onChange={handleChange} required/>
        <input placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} required/>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
