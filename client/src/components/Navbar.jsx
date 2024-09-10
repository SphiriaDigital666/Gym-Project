import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "../assets/styles/Navbar.css";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Our trainers",
    path: "/trainers",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  // {
  //   name: "Sign up",
  //   path: "/login",
  // },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
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
        console.log(error.message);
      }
    }
  }, []);

  const handleClick = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <header className="fixed top-0 z-50 w-full text-white">
      {/* -------- -------- MAIN NAVBAR -------- -------- */}
      <section
        className={`mx-auto flex items-center justify-between px-[10vw] py-5 sm:py-8 md:px-[5vw] 2xl:py-10 ${isToggled && "bg-secondary"}`}
      >
        <h1
          className="text-sm font-semibold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 md:text-xl 2xl:text-2xl"
          onClick={() => isToggled && handleClick()}
        >
          <Link to="/">FitCore</Link>
        </h1>
        <nav className="hidden space-x-8 text-xs capitalize md:block xl:space-x-16 2xl:text-base">
          {links.map(({ name, path }) => (
            // <NavLink
            //   key={path}
            //   to={path}
            //   className={({ isActive }) =>
            //     `${path === "/login" ? "bg-primary px-[0.6em] py-[0.3em] font-bold capitalize text-black" : "text-lift"} ${isActive && path !== "/login" ? "text-primary" : "hover:opacity-70"}`
            //   }
            // >
            //   {name}
            // </NavLink>
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-lift ${isActive ? "text-primary" : "hover:opacity-70"}`
              }
            >
              {name}
            </NavLink>
          ))}
          <NavLink
            to={isLoggedIn ? "/profile" : "/login"}
            className={({ isActive }) =>
              `bg-primary px-[0.6em] py-[0.3em] font-bold capitalize text-black ${isActive ? "" : "hover:opacity-70"}`
            }
          >
            {isLoggedIn ? "Profile" : "Sign Up"}
          </NavLink>
        </nav>
        <button
          className={`${isToggled && "animate-toggle-button"} relative h-4 w-6 transition-opacity duration-300 md:hidden`}
          onClick={handleClick}
        >
          <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
        </button>
      </section>
      {/* -------- -------- MOBILE NAVBAR -------- -------- */}
      <section
        className={`${isToggled ? "flex md:hidden" : "hidden"} animate-open-menu absolute w-full origin-top justify-center bg-secondary`}
        onClick={handleClick}
      >
        <nav className="flex w-full flex-col px-[10vw] pb-8 text-xs">
          {links.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${path === "/login" ? "mt-8 w-fit bg-primary px-[0.6em] py-[0.3em] font-bold capitalize text-black" : "text-lift py-4"} ${isActive && path !== "/login" ? "text-primary" : "hover:opacity-70"} ${path !== "/" && path !== "/login" && "mt-4"}`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
