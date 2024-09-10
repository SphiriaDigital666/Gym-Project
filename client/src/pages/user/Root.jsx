import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Root = () => {
  const path = useLocation().pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("token has been tampered with");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, [path]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="bg-secondary text-white">
        <Outlet />
      </main>
      {path !== "/login" && <Footer />}
    </>
  );
};

export default Root;
