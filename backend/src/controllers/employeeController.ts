import type { Request, Response } from "express";
import { getAllEmployees, getEmployeeById } from "../services/employeeService.js";

export async function getAll(req: Request, res: Response) {
  const data = await getAllEmployees();
  res.json(data);
}

export async function getById(req: Request, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "Missing id" });

  const id = Number(idParam);
  const employee = await getEmployeeById(id);

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json(employee);
}
