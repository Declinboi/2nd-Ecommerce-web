import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



// import { createContext, useState } from "react";
// import { Auth0Provider } from "@auth0/auth0-react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

//   return (
//       <Auth0Provider
//         domain={domain}
//         clientId={clientId}
//         authorizationParams={{
//           redirect_uri: window.location.origin,
//         }}
//       >
//     <AuthContext.Provider value={{ auth, setAuth }}>
//         {children}
//     </AuthContext.Provider>
//       </Auth0Provider>
//   );
// };

// export default AuthContext;
