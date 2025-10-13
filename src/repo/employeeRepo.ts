
import type { EmployeeDraft } from "../services/validStaffService";

export type Employee = EmployeeDraft;

export const employeeRepo = {
  create(current: Employee[], draft: EmployeeDraft): Employee[] {
    return [...current, { ...draft }];
  },
};
