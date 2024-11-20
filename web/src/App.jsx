import React, { useEffect } from "react";
import { Outlet } from "react-router";
// import AOS from "aos";
// import "aos/dist/aos.css";
import Navbar from "./components/Navbar";

function App() {
  // useEffect(() => {
  //   AOS.init({
  //     offset: 100,
  //     duration: 800,
  //     easing: "ease-in-sine",
  //     delay: 100,
  //   }),
  //     AOS.refresh();
  // });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
