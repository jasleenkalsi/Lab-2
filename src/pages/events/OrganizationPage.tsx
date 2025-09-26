import { Link } from "react-router-dom";

type Role = {
  role: string;
  department: string;
};

interface MyOrganizationProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

export function MyOrganization({ roles /*, setRoles*/ }: MyOrganizationProps) {
  const NoRolesFound = () => {
    return (
      <div className="flex flex-col text-xl gap-4">
        <div>
          <span>You have no roles saved.</span>
        </div>
        <div>
          <Link to="/organization">
            <span className="text-sky-600 hover:underline">View organization</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      {roles.length === 0 ? <NoRolesFound /> : <></>}
      <div className="p-16">
        <RoleListSimple roles={roles} />
      </div>
    </div>
  );
}

function RoleListSimple({ roles }: { roles: Role[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {roles.map((r, index) => (
        <li key={index} className="flex items-center justify-between">
          <span>{r.role}</span>
          <span className="text-gray-500">{r.department}</span>
        </li>
      ))}
    </ul>
  );
}
