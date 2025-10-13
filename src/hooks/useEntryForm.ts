
import { useState } from "react";
import { validStaffService, type EmployeeDraft, type RoleDraft } from "../services/validStaffService";

type Mode = "employee" | "role";

type UseEntryFormOpts = {
  mode: Mode;
  roleTitles?: string[];
  existingRoles?: Array<{ role: string; department: string; description: string }>; 
  departments?: string[]; 
  onCreate: (value: EmployeeDraft | RoleDraft) => void;
};

export function useEntryForm(opts: UseEntryFormOpts) {
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [employeeDraft, setEmployeeDraft] = useState<EmployeeDraft>({
    firstName: "",
    lastName: "",
    role: opts.roleTitles?.[0] || "",
  });

  const [roleDraft, setRoleDraft] = useState<RoleDraft>({
    role: "",
    department: opts.departments?.[0] || "",
    description: "",
  });

  function setField<K extends keyof EmployeeDraft | keyof RoleDraft>(key: K, value: string) {
    if (opts.mode === "employee") {
      setEmployeeDraft(prev => ({ ...prev, [key as keyof EmployeeDraft]: value } as EmployeeDraft));
    } else {
      setRoleDraft(prev => ({ ...prev, [key as keyof RoleDraft]: value } as RoleDraft));
    }
  }

  function reset() {
    setErrors([]);
    setSubmitting(false);
    setEmployeeDraft({
      firstName: "",
      lastName: "",
      role: opts.roleTitles?.[0] || "",
    });
    setRoleDraft({
      role: "",
      department: opts.departments?.[0] || "",
      description: "",
    });
  }

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSubmitting(true);

    if (opts.mode === "employee") {
      const res = validStaffService.validateEmployee(employeeDraft, {
        roleTitles: opts.roleTitles || [],
      });
      if (!res.valid) {
        setErrors(res.errors);
        setSubmitting(false);
        return;
      }
      opts.onCreate(employeeDraft);
      reset();
      return;
    }

    const res = validStaffService.validateRole(roleDraft, {
      existingRoles: opts.existingRoles || [],
      departments: opts.departments || [],
    });
    if (!res.valid) {
      setErrors(res.errors);
      setSubmitting(false);
      return;
    }
    opts.onCreate(roleDraft);
    reset();
  }

  return {
    mode: opts.mode,
    employeeDraft,
    roleDraft,
    errors,
    submitting,
    setField,
    submit,
    reset,
  };
}
