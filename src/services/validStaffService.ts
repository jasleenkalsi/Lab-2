
export type EmployeeDraft = {
  firstName: string;
  lastName: string;
  role: string; 
};

export type RoleDraft = {
  role: string;        
  department: string;
  description: string; 
};

export type ValidateResult = {
  valid: boolean;
  errors: string[];
};

function atLeast3(s: string) {
  return (s ?? "").trim().length >= 3;
}

export const validStaffService = {
  validateEmployee(
    draft: EmployeeDraft,
    ctx: { roleTitles: string[] }
  ): ValidateResult {
    const errors: string[] = [];

    if (!atLeast3(draft.firstName)) errors.push("First name must be at least 3 characters.");
    if (!atLeast3(draft.lastName)) errors.push("Last name must be at least 3 characters.");

    const chosen = (draft.role || "").trim();
    if (!ctx.roleTitles.includes(chosen)) {
      errors.push("Please select a valid role.");
    }

    return { valid: errors.length === 0, errors };
  },


  validateRole(
    draft: RoleDraft,
    ctx: {
      departments: string[];
      existingRoles: Array<{ role: string; department: string; description: string }>;
    }
  ): ValidateResult {
    const errors: string[] = [];

    if (!atLeast3(draft.role)) errors.push("Role title must be at least 3 characters.");
    if (!atLeast3(draft.description)) errors.push("Description must be at least 3 characters.");

    if (!ctx.departments.includes((draft.department || "").trim())) {
      errors.push("Please choose a valid department.");
    }

    const wanted = (draft.role || "").trim().toLowerCase();
    const same = ctx.existingRoles.find(r => r.role.trim().toLowerCase() === wanted);

    if (same && (same.description || "").trim().length > 0) {
      errors.push("This role already exists and is filled.");
    }

    return { valid: errors.length === 0, errors };
  },
};
