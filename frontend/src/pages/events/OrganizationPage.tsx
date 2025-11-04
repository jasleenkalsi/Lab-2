import React, { useState } from "react";
import * as data from "../../data/organization.json";


type Role = {
  role: string;
  department: string;
  description: string;
};

type OrgData = {
  departments: string[];
  roles: Role[];
};

export default function OrganizationPage() {
  const org = data as OrgData;

  const [roles, setRoles] = useState<Role[]>(org.roles);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(org.departments[0] || "");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const visible = roles.filter((r) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      r.role.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  });

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    const d = description.trim();

    if (t.length < 3) { setError("Role title must be at least 3 chars."); return; }
    if (d.length < 3) { setError("Description must be at least 3 chars."); return; }
    if (roles.some((r) => r.role.toLowerCase() === t.toLowerCase())) {
      setError("Role already exists."); return;
    }

    setRoles([...roles, { role: t, department, description: d }]);
    setTitle("");
    setDepartment(org.departments[0] || "");
    setDescription("");
    setError("");
  }

  return (
    <div>
      <h1>Organization</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      <form onSubmit={onAdd}>
        <div>
          <label>Role</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {org.departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Add</button>
      </form>

      <h2>Roles</h2>
      <ul>
        {visible.map((r, i) => (
          <li key={i}>
            <div>{r.role}</div>
            <div>{r.department}</div>
            <div>{r.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
