import employeesJson from "../../data/employees.json";

interface EmployeeDepartment {
  department: string;
  employees: string[];
}

export function EmployeeList() {
  const departmentsEmployees = new Array<EmployeeDepartment>();

  const populateDepartmentEmployees = () => {
    for (const department of Object.keys(employeesJson.departments)) {
      const departmentEmployee: EmployeeDepartment = {
        department,
        employees: [],
      };
      for (const employee of (employeesJson.departments as any)[department]) {
        departmentEmployee.employees.push(employee);
      }
      departmentsEmployees.push(departmentEmployee);
    }
  };
  populateDepartmentEmployees();

  return (
    <main>
      <h2>Employee Directory</h2>

      <div id="employee-list">
        {departmentsEmployees.map((x, i) => (
          <div key={i}>
            <h2>{x.department}</h2>
            <ul>
              <li className="employee">
                {x.employees.map((y, i) => (
                  <div key={i}>{y}</div>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
