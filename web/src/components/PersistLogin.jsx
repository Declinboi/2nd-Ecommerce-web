import React, { useEffect, useState } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import useAuth from "../Hooks/useAuth";
import { Outlet } from "react-router";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <div>
      {!persist ? <Outlet /> : isLoading ? <p>Loading....</p> : <Outlet />}
    </div>
  );
};

export default PersistLogin;
