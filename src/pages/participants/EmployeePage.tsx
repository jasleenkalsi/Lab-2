import { useMemo, useState } from "react";
import employeesRaw from "../../data/employees.json";

interface Employee {
  id: number;
  name: string;
  department: string;
}

interface EmployeeDepartment {
  department: string;
  employees: string[];
}

interface RawEmployeesJson {
  departments: Record<string, string[]>; 
}

function normalize(raw: RawEmployeesJson): Employee[] {
  const result: Employee[] = [];
  let id = 1;
  for (const [department, names] of Object.entries(raw.departments)) {
    for (const name of names) {
      result.push({ id: id++, name, department });
    }
  }
  return result;
}

export default function EmployeePage() {
  const all: Employee[] = useMemo(() => {
    const raw = employeesRaw as unknown as RawEmployeesJson;
    return normalize(raw);
  }, []);

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(
      (e) =>
        e.name.toLowerCase().includes(s) ||
        e.department.toLowerCase().includes(s)
    );
  }, [q, all]);

  const grouped: EmployeeDepartment[] = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const e of filtered) {
      if (!map[e.department]) map[e.department] = [];
      map[e.department].push(e.name);
    }
    return Object.keys(map).map((dept) => ({
      department: dept,
      employees: map[dept],
    }));
  }, [filtered]);

  return (
    <div>
      <h1>Employees</h1>
      <input
        placeholder="search name"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {grouped.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        grouped.map((g, i) => (
          <div key={i}>
            <h3>{g.department}</h3>
            <ul>
              {g.employees.map((name, j) => (
                <li key={j}>{name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
