import React from "react";
import User from "../components/User";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-gray-100">
      <h1 className="text-3xl ">Admin page</h1>
      <br />
      <User />

      <div className="border rounded-md shadow-md border-blue-600 px-4 py-2 mt-6 hover:bg-blue-700 hover:text-white ">
        <Link to={"/"}> Home </Link>
      </div>
    </div>
  );
};

export default Admin;
