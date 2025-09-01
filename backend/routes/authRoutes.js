import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Temporary route to create admin (run once)
// Temporary route to create admin (run only once)
router.post("/create-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    res.send("Admin created successfully");
  } catch (err) {
    res.status(500).json({ message: "Failed to create admin", error: err.message });
  }
});


export default router;
