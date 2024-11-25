import React from "react";
import Logo from "../assets/logo.png";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Darkmode from "./Darkmode";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import useLogout from "../Hooks/useLogout";

const menuLink = [
  {
    path: "/",
    link: "Home",
  },
  {
    path: "/services",
    link: "Top Rated",
  },
  {
    path: "/",
    link: "Kids Wear",
  },
  {
    path: "/",
    link: "Mens Wear",
  },
  {
    path: "/",
    link: "Electronics",
  },
];

const DropdownLinks = [
  {
    path: "/",
    link: "Trending Products",
  },
  {
    path: "/",
    link: "Best Selling",
  },
  {
    path: "/",
    link: "Top Rated",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper navbar */}
      <div className="bg-orange-300 dark:bg-orange-500  py-2 sm:py-0">
        <div className="container flex justify-between items-center ">
          <div className="">
            <a
              href="#"
              className="font-bold flex uppercase text-2xl sm:text-3xl gap-2"
            >
              <img src={Logo} alt="logo" className="w-10 " />
              shopsy
            </a>
          </div>
          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative sm:block hidden group">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-orange-300 dark:bg-gray-700"
              />
              <FaSearch className="text-gray-400 group-hover:text-orange-300 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            {/* order button */}
            <button
              onClick={() => alert("Ordering not available yet ")}
              className="bg-gradient-to-r from-orange-300 to-orange-600 transition-all duration-300 text-white px-4 py-1 rounded-full flex items-center gap-3 group "
            >
              <span className="group-hover:block hidden transition-all duration-200 ">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            {/* darkmode switch */}
            <div>
              <Darkmode />
            </div>
            <div className="md:flex hidden gap-x-3 ">
              <button
                className="bg-gradient-to-r from-orange-300 to-orange-600 transition-all duration-300 text-white px-4 py-1 rounded-full flex items-center gap-3"
                onClick={signOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* lower navbar */}
      <div className="">
        <ul className="sm:flex hidden items-center justify-center space-x-4">
          {menuLink.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="inline-block px-4 hover:text-orange-400 duration-300"
              >
                {link}
              </NavLink>
            </li>
          ))}
          {/* dropdownlink */}
          {
            <li className="group relative cursor-pointer">
              <a href="" className="flex items-center gap-1 py-2  ">
                Trending Items
                <span>
                  <FaCaretDown className="group-hover:rotate-180 duration-200 transition-all" />
                </span>
              </a>
              {/* dropdown */}
              <div className="absolute z-[9999] w-[200px] p-2 rounded-md shadow-md bg-white dark:bg-gray-700 group-hover:block hidden transition-all duration-300 ">
                <ul>
                  {DropdownLinks.map(({ path, link }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className="inline-block w-full rounded-md hover:bg-orange-200 dark:hover:bg-gray-500 p-2"
                      >
                        {link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
