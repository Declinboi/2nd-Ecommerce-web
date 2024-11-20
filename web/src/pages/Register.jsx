import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle, FaTimes, FaCheck } from "react-icons/fa";
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
    const result = USER_REGEX.test(user);
    console.log(user);
    console.log(result);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    console.log(result);
    setValidPwd(result);

    const match = pwd === matchPwd;
    console.log(match);
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // to prevent hacker
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("invalid entry");
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
      console.log(response.accessToken);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registeration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h1 className="text-green-400 text-3xl">Successfully logged in</h1>
          <p>
            <Link to={"/"}> Sign In</Link>
          </p>
        </div>
      ) : (
        <section className=" container   ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold text-center pt-10">Register</h1>
          <form
            onSubmit={HandleSubmit}
            className="lg:pt-14 pt-8 max-w-[500px] space-y-2 mx-auto bg-orange-500 rounded-md"
          >
            <div className="inline-flex ">
              <label htmlFor="username" className="flex px-6 text-xl  ">
                Username:
                <span className={validName ? "valid" : "hidden"}>
                  <FaCheck className="text-green-500 text-sm" />
                </span>
                <span className={validName || !user ? "hidden" : "invalid"}>
                  <FaTimes className="text-red-500 text-sm" />
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
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="rounded-md px-4 border outline-none focus:border-red-700 w-full"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "hidden"
                }
              >
                <FaInfoCircle className="text-sm"/> 4 to 24 characters. <br /> Must begin with a
                letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.{" "}
              </p>
            </div>
            <div className="inline-flex">
              <label htmlFor="password" className="flex px-6 text-xl ">
                Password:
                <div className="text-sm">

                <span className={validPwd ? "valid" : "hidden"}>
                  <FaCheck className="text-green-500 text-sm" />
                </span>
                <span className={validPwd || !pwd ? "hidden" : "invalid"}>
                  <FaTimes className="text-red-500 text-sm" />
                </span>
                </div>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? false : true}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="rounded-md px-4 border outline-none focus:border-red-700 w-full"
              />
              <p
                id="pwdnote"
                className={pwdFocus &&  !validPwd ? "instructions" : "hidden"}
              >
                <FaInfoCircle className="text-sm"/> 8 to 24 characters. <br /> Must include
                uppercase and lowercase letters, a number, and a special
                character. <br /> Allowed Special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div className="inline-flex">
              <label htmlFor="confirm_pwd" className="flex  px-6 text-xl ">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hidden"}>
                  <FaCheck className="text-green-500 text-sm" />
                </span>
                <span
                  className={validMatch || !matchPwd ? "hidden" : "invalid"}
                >
                  <FaTimes className="text-red-500 text-sm" />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? false : true}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="rounded-md px-4 border outline-none focus:border-red-700 w-auto"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "hidden"
                }
              >
                <FaInfoCircle className="text-sm"/> Must match the first password input field.
              </p>
            </div>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already Registered? <br />
            <span>
              <Link to="#">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
