import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = "./auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {success ? (
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-green-600 text-3xl font-bold mb-4">
            Successfully logged in
          </h1>
          <p>
            <Link to={"/"} className="text-blue-500 hover:underline">
              Go To Home
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <p
            ref={errRef}
            className={`text-red-500 text-sm mb-4 ${errMsg ? "" : "hidden"}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>

          <form onSubmit={HandleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Need an account? <br />
            <Link to={"/register"} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
