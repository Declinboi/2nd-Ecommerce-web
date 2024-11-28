import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import Protected from "./pages/Protected.jsx";
import Linkpage from "./pages/Linkpage.jsx";
import Unauthorised from "./pages/Unauthorised.jsx";
import Admin from "./pages/Admin.jsx";
import Editor from "./pages/Editor.jsx";
import Lounge from "./pages/Lounge.jsx";
import Missing from "./pages/Missing.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import RequiredAuth from "./components/RequiredAuth.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Auth0Provider } from "@auth0/auth0-react";
// import User from "./pages/User.jsx";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function AppRouter() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/unauthorised", element: <Unauthorised /> },
        // { path: "/user", element: <User /> },

        {
          element: <PersistLogin />,
          children: [
            // Protected routes in a wrapper
            {
              element: (
                <RequiredAuth
                  allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
                />
              ),
              children: [
                { path: "/linkpage", element: <Linkpage /> },
                { path: "/contact", element: <Contact /> },
              ],
            },

            {
              element: (
                <RequiredAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              ),
              children: [
                { path: "/editor", element: <Editor /> },
                { path: "/lounge", element: <Lounge /> },
                { path: "/layout", element: <Layout /> },
              ],
            },

            {
              element: <RequiredAuth allowedRoles={[ROLES.Admin]} />,
              children: [
                { path: "/admin", element: <Admin /> },
                { path: "/protected", element: <Protected /> },
                { path: "/*", element: <Missing /> },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Auth0Provider
        // domain={process.env.REACT_APP_AUTH0_DOMAIN}
        // clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        // authorizationParams={{
        //   redirect_uri: window.location.origin
        // }}
        >
        <AuthProvider>
        <AppRouter />
    </AuthProvider>
      </Auth0Provider>
  </StrictMode>
);
