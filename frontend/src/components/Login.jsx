import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);

      if (!data.user.isAdmin) return alert("❌ Only admin can login here");

      localStorage.setItem("token", data.token);
      alert("✅ Login successful");
      navigate("/admin"); // go to admin page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
