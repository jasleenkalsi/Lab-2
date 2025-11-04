import type { Request, Response } from "express";
import { getAllRoles, getRoleById } from "../services/roleService.js";

export async function getAll(req: Request, res: Response): Promise<void> {
  const roles = await getAllRoles();
  res.json(roles); 
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const role = await getRoleById(id);
  if (!role) {
    res.status(404).json({ message: "Role not found" });
    return;
  }

  res.json(role); 
}
