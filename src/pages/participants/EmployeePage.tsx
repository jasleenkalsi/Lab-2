import { Link } from "react-router";
type Employee = { id: number; name: string; department: string };

interface MyEmployeesProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export function MyEmployees({ employees }: MyEmployeesProps) {
  const NoEmployeesFound = () => {
    return (
      <div className="flex flex-col text-xl gap-4">
        <div>
          <span>You have no employees saved.</span>
        </div>
        <div>
          <Link to="/employees">
            <span className="text-sky-600 hover:underline">View all employees</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      {employees.length === 0 ? <NoEmployeesFound /> : <></>}
      <div className="p-16">
        <EmployeeListSimple employees={employees} />
      </div>
    </div>
  );
}

function EmployeeListSimple({ employees }: { employees: Employee[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {employees.map((e) => (
        <li key={e.id} className="flex items-center justify-between">
          <span>{e.name}</span>
          <span className="text-gray-500">{e.department}</span>
        </li>
      ))}
    </ul>
  );
}
