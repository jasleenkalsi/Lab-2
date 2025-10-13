import React, { useState } from "react";
import * as employeesData from "../../data/employees.json";
import * as orgData from "../../data/organization.json";

type RoleItem = {
   role: string;
  department: string; 
  description: string };

type Org = {
  departments: string[];
  roles: RoleItem[];
};

type Employee = {
  firstName: string;
  lastName: string;
  role: string;
};


export default function EmployeePage() {
  const org = orgData as unknown as Org;
  const roleOptions: string[] = org.roles.map((r) => r.role);
  const raw = employeesData as any;
  const initialEmployees: Employee[] = Array.isArray(raw)
    ? (raw as Employee[])
    : (raw?.employees ?? []);

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState(roleOptions[0] || "");
  const [error, setError] = useState("");

  const visible = employees.filter((e) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q)
    );
  });

  function onAdd(e: React.FormEvent) {
    e.preventDefault();

    const f = firstName.trim();
    const l = lastName.trim();
    const r = role.trim();

    if (f.length < 3) { setError("First name must be at least 3 characters."); return; }
    if (l.length < 3) { setError("Last name must be at least 3 characters."); return; }
    if (!roleOptions.includes(r)) { setError("Please select a valid role."); return; }

    setEmployees([...employees, { firstName: f, lastName: l, role: r }]);
    setFirstName("");
    setLastName("");
    setRole(roleOptions[0] || "");
    setError("");
  }

  return (
    <div>
      <h1>Employees</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or role"
      />

      <form onSubmit={onAdd}>
        <div>
          <label>First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div>
          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roleOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Add Employee</button>
      </form>

      <h2>List</h2>
      <ul>
        {visible.map((e, i) => (
          <li key={i}>
            <div>{e.firstName} {e.lastName}</div>
            <div>{e.role}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
