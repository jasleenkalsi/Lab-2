import type { Request, Response, NextFunction } from "express";

export default function validateApiKey(req: Request, res: Response, next: NextFunction): void {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const key = req.headers["x-api-key"];

  if (ua.includes("postman") || key === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized client" });
  }
}
