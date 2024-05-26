import Main from "@/Layouts/Main";
import Home from "@/pages/Home/Home";
import ContectUs from "@/pages/contact/Contact";
import Dishes from "@/pages/dishes/Dishes";
import ErrorPage from "@/pages/error/ErrorPage";
import Login from "@/pages/login/login";
import Register from "@/pages/register/Register";
import Verify from "@/pages/verify/Verify";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContectUs />,
      },
      {
        path: "/dishes",
        element: <Dishes />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email/:email",
    element: <Verify />,
  },
]);

export default router;
