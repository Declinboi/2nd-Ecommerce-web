import React from "react";
import { useNavigate } from "react-router";

const Unauthorised = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-gray-100">
      <h1 className="text-gray-600 text-3xl">Unauthorised User </h1>
      <br />
      <p className="text-red-500">you are not authorised to access this page</p>

      <div className="border rounded-md shadow-md border-blue-600 px-4 py-2 mt-6 hover:bg-blue-700 hover:text-white ">
        <button onClick={goBack}> Go Back </button>
      </div>
    </div>
  );
};

export default Unauthorised;
