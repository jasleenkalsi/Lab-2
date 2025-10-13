import { useState } from "react"; import { validStaffService, type EmployeeDraft, type RoleDraft } from "../services/validStaffService";

type Mode = "employee" | "role";

type UseEntryFormOpts = {
  mode: Mode;
  roleTitles?: string[];
  departments?: string[];
  existingRoles?: string[]; 
  onCreate: (value: EmployeeDraft | RoleDraft) => void;
};

export function useEntryForm({
  mode,
  roleTitles = [],
  departments = [],
  existingRoles = [],
  onCreate,
}: UseEntryFormOpts) {
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [employeeDraft, setEmployeeDraft] = useState<EmployeeDraft>({
    firstName: "",
    lastName: "",
    role: roleTitles[0] || "",
  });

  const [roleDraft, setRoleDraft] = useState<RoleDraft>({
    role: "",
    department: departments[0] || "",
    description: "",
  });

  function setField(key: string, value: string) {
    if (mode === "employee") {
      setEmployeeDraft((d) => ({ ...d, [key]: value } as EmployeeDraft));
    } else {
      setRoleDraft((d) => ({ ...d, [key]: value } as RoleDraft));
    }
  }

  function reset() {
    setErrors([]);
    setSubmitting(false);
    setEmployeeDraft({ firstName: "", lastName: "", role: roleTitles[0] || "" });
    setRoleDraft({ role: "", department: departments[0] || "", description: "" });
  }

  async function submit(e?: { preventDefault?: () => void }) {
    e?.preventDefault?.();
    setSubmitting(true);

    if (mode === "employee") {
      const res = validStaffService.validateEmployee(employeeDraft, { roleTitles });
      if (!res.valid) {
        setErrors(res.errors);
        setSubmitting(false);
        return;
      }
      onCreate(employeeDraft);
      reset();
    } else {
      const res = validStaffService.validateRole(roleDraft, { existingRoles, departments });
      if (!res.valid) {
        setErrors(res.errors);
        setSubmitting(false);
        return;
      }
      onCreate(roleDraft);
      reset();
    }
  }

  return {
    mode,
    employeeDraft,
    roleDraft,
    errors,
    submitting,
    setField,
    submit,
    reset,
  };
}
