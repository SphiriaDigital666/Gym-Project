import { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup, FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";
import "../assets/styles/AdminNavbar.css";

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: (
      <MdDashboard className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
    ),
  },
  {
    name: "Members",
    path: "/admin/members",
    icon: (
      <FaUserGroup className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
    ),
  },
  {
    name: "Trainers",
    path: "/admin/trainers",
    icon: (
      <FaUser className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
    ),
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: (
      <FaUserCircle className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
    ),
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: (
      <GiReceiveMoney className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
    ),
  },
];

const AdminNavbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNavVisbilty = () => {
    setIsNavVisible((prev) => !prev);
  };

  return (
    <header
      onBlur={() => {
        setIsNavVisible(false);
      }}
      className="relative bg-secondary"
    >
      <nav
        className={`flex h-[100svh] flex-col items-center justify-between bg-primary py-[50%] font-semibold capitalize leading-none ${isNavVisible ? "slide-in-admin-nav" : "reset-admin-nav"}`}
      >
        <h1 className="text-[13px] font-bold text-black transition-transform duration-300 hover:scale-105 sm:text-[17px] md:text-[20px] lg:text-[23px] xl:text-[26px] 2xl:text-[29px]">
          <Link to="/admin">FitCore</Link>
        </h1>
        <ul className="flex flex-col">
          {links.map(({ name, path, icon }) => (
            <li key={path} className="relative mb-[4vh]">
              <div className="absolute bottom-full right-0 size-[20%] bg-secondary"></div>
              <div className="absolute right-0 top-full size-[20%] bg-secondary"></div>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `ms-[1.3em] flex items-center rounded-s-lg py-[1.3em] pe-[3em] ps-[1.5em] text-[9px] before:absolute before:bottom-full before:right-0 before:size-[20%] before:bg-primary after:absolute after:right-0 after:top-full after:size-[20%] after:bg-primary sm:text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[17px] ${isActive && "bg-secondary text-white before:rounded-ee-lg after:rounded-tr-lg"}`
                }
                end={path === "/admin" && true}
              >
                {icon}
                <span className="ps-[0.4em]">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="flex items-center text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[17px]"
        >
          <IoLogOutSharp className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]" />
          <span className="ps-[0.4em]">Logout</span>
        </Link>
      </nav>
      <div
        className={`absolute left-5 top-5 sm:hidden ${isNavVisible ? "move-toggle-button" : "reset-toggle-button"}`}
      >
        <button
          onClick={toggleNavVisbilty}
          className={`${isNavVisible && "animate-toggle-button"} relative h-4 w-6 transition-opacity duration-300 md:hidden`}
        >
          <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
