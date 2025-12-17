import jwt from "jsonwebtoken";
import userModel from "../model/user.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    req.user = user; 
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
