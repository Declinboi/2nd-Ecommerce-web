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
import {AuthProvider} from "./Context/AuthProvider.jsx";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";





function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/contact",
          element: <Contact />,
        },

        {
          path: "layout",
          element: <Layout />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "protected",
          element: <Protected />,
        },
        {
          path: "linkpage",
          element: <Linkpage />,
        },
        {
          path: "unauthorised",
          element: <Unauthorised />,
        },
        {
          path: "editor",
          element: <Editor />,
        },
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "lounge",
          element: <Lounge />,
        },
        {
          path: "*",
          element: <Missing />,
        },

        {
          path: "/register",
          element: <Register />,
        },
        // {
        //   path: "/blogs/:id",
        //   element: <Singlepost/>,
        //   loader: ({params}) => (`Blogs ${params.id}`),
        // },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
