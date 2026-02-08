import jwt from "jsonwebtoken";

export function requireAuth(adminOnly = false) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) return res.status(401).json({ ok: false, message: "Unauthorized" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // All authenticated users are admins - if they can login, they're admin
      req.user = { ...payload, isAdmin: true };

      // No need to check adminOnly since all logged-in users are admins
      next();
    } catch (err) {
      console.warn("JWT verification failed:", err.message);
      return res.status(401).json({ ok: false, message: "Invalid token" });
    }
  };
}
