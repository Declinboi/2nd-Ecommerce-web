
import React from "react";
import LoginButton from "../Auth0Login/LoginButton";
import LogoutButton from "../Auth0Login/LogoutButton";
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const Unauthorised = () => {
  const { isLoading, error } = useAuth0();

  return (
    <div>
      <h1> Auth0 Login </h1>
      {error && <p> Authentication error </p>}
      {!error && isLoading && <p> Loading.... </p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </div>
  );
};

export default Unauthorised;