import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Root = () => {
  const path = useLocation().pathname;

  return (
    <>
      <Navbar />
      <main className="bg-secondary text-white">
        <Outlet />
      </main>
      {path !== "/login" && <Footer />}
    </>
  );
};

export default Root;
