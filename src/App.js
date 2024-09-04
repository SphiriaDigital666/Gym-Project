import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const path = useLocation().pathname;

  return (
    <div className="bg-secondary text-white">
      <Navbar />
      <Outlet />

      {path !== "/login" && <Footer />}
    </div>
  );
};

export default App;
