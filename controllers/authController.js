import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

/** POST /register */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};

/** POST /login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};

/** GET /me (needs auth) */
export const me = async (_req, res) => {
  try {
    const user = await User.findById(res.locals.user.id).select("-password");
    return res.json({ user });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};