import { Link, NavLink } from "react-router-dom";

const links = [
  { name: "dashboard", path: "/admin" },
  { name: "members", path: "/admin/members" },
  { name: "trainers", path: "/admin/trainers" },
  { name: "profile", path: "/admin/profile" },
  { name: "payments", path: "/admin/payments" },
];

const AdminNavbar = () => {
  return (
    <header>
      <nav className="space-x-2">
        {links.map(({ name, path }) => (
          <NavLink key={path} to={path}>
            {name}
          </NavLink>
        ))}
        <Link to="/">Logout</Link>
      </nav>
    </header>
  );
};

export default AdminNavbar;
