import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    if (!decoded.isAdmin) return res.status(403).json({ message: "Not authorized, admin only" });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
