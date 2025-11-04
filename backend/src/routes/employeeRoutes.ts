import { Router, type RequestHandler } from "express";
import { getAll, getById } from "../controllers/employeeController.js";

const router = Router();

router.get("/", getAll as RequestHandler);
router.get("/:id", getById as RequestHandler);

export default router;
