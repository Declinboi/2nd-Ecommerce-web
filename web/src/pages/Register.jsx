import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle, FaTimes, FaCheck, FaSleigh } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className=" min-h-screen items-center justify-center bg-gray-100 pt-6">
      {success ? (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-3xl text-green-500 font-bold mb-4">
            Registration Successful!
          </h1>
          <Link
            to="/"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <section className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
          <p
            ref={errRef}
            className={
              errMsg
                ? "bg-red-100 text-red-600 text-center p-2 rounded mb-4"
                : "hidden"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Register
          </h1>
          <form onSubmit={HandleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
                <span className={validName ? "text-green-500 ml-2" : "hidden"}>
                  <FaCheck />
                </span>
                <span
                  className={
                    validName || !user ? "hidden" : "text-red-500 ml-2"
                  }
                >
                  <FaTimes />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? false : true}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
              {userFocus && user && !validName && (
                <p className="text-sm text-gray-500 mt-1">
                  <FaInfoCircle className="inline-block mr-1" />4 to 24
                  characters. Must begin with a letter. Letters, numbers,
                  underscores, hyphens allowed.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
                <span className={validPwd ? "text-green-500 ml-2" : "hidden"}>
                  <FaCheck />
                </span>
                <span
                  className={validPwd || !pwd ? "hidden" : "text-red-500 ml-2"}
                >
                  <FaTimes />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? false : true}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
              {pwdFocus && !validPwd && (
                <p className="text-sm text-gray-500 mt-1">
                  <FaInfoCircle className="inline-block mr-1" />8 to 24
                  characters. Must include uppercase, lowercase, a number, and a
                  special character (!@#$%).
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_pwd"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
                <span
                  className={
                    validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"
                  }
                >
                  <FaCheck />
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"
                  }
                >
                  <FaTimes />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? false : true}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
              {matchFocus && !validMatch && (
                <p className="text-sm text-gray-500 mt-1">
                  <FaInfoCircle className="inline-block mr-1" />
                  Must match the password.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already Registered?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
