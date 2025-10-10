import { Link } from "react-router-dom"

type Role = {
  role: string;
  department: string;
};

interface MyOrganizationProps {
  roles?: Role[];
  setRoles?: React.Dispatch<React.SetStateAction<Role[]>>;
}

export function MyOrganization({ roles }: MyOrganizationProps) {
  if (!roles || roles.length === 0) {
    return (
      <div>
        <div>You have no roles saved.</div>
        <div>
          <Link to="/organization">View organization</Link>
        </div>
      </div>
    );
  }

  return <RoleListSimple roles={roles} />;
}

function RoleListSimple({ roles }: { roles: Role[] }) {
  return (
    <ul>
      {roles.map((r, index) => (
        <li key={index}>
          <span>{r.role}</span> — <span>{r.department}</span>
        </li>
      ))}
    </ul>
  );
}
