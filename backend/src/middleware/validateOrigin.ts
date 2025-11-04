import type { Request, Response, NextFunction } from "express";

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

export default function validateOrigin(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.length && !allowedOrigins.includes(origin)) {
    res.status(403).json({ message: "Unauthorized origin" });
    return; 
  }
  next(); 
}
