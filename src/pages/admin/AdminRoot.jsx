import { Outlet } from "react-router-dom";

import AdminNavbar from "../../components/AdminNavbar";

const AdminRoot = () => {
  return (
    <div className="flex">
      <AdminNavbar />
      <main className="h-[100svh] flex-grow bg-secondary text-center text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoot;
