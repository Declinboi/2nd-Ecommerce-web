import React, { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import Light from "../assets/website/light-mode-button.png";
import Black from "../assets/website/dark-mode-button.png";

const Darkmode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
      element.classList.remove("light");
    }
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <img
          src={Light}
          alt=""
          onClick={() => setTheme("light")}
          className=" w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
        />
      ) : (
        <img
          src={Black}
          onClick={() => setTheme("dark")}
          className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
        />
      )}
    </>
  );
};

export default Darkmode;
