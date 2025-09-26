import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <div className="links">
        <span><Link to="/employees">Employees</Link></span>
        <span><Link to="/organization">Organization</Link></span>
        <span><Link to="/list">Employee List</Link></span>
      </div>
    </nav>
  );
}
