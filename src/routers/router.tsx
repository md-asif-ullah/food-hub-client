import AddItem from "@/Deshbord/AddItem/AddItem";
import AdminOrders from "@/Deshbord/AdminOrders/AdminOrders";
import UserOrder from "@/Deshbord/Orders/UserOrder";
import Profile from "@/Deshbord/Profile/Profile";
import Customers from "@/Deshbord/customers/Customers";
import EditCustomer from "@/Deshbord/customers/EditCustomer";
import Deshboard from "@/Layouts/Deshboard";
import Main from "@/Layouts/Main";
import VerifyOtp from "@/components/VarifyOtp";
import About from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import Cart from "@/pages/cart/Cart";
import ContectUs from "@/pages/contact/Contact";
import Dishes from "@/pages/dishes/Dishes";
import ErrorPage from "@/pages/error/ErrorPage";
import Favourite from "@/pages/favourite/Favourite";
import Login from "@/pages/login/login";
import PaymentInfo from "@/pages/paymentInfo/PaymentInfo";
import Product from "@/pages/productDetails/Product";
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
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/payment-info",
        element: <PaymentInfo />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
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
  {
    path: "/verify-otp/:email",
    element: <VerifyOtp />,
  },
  {
    path: "/deshbord",
    element: <Deshboard />,
    children: [
      {
        path: "/deshbord/profile",
        element: <Profile />,
      },
      {
        path: "/deshbord/additem",
        element: <AddItem />,
      },
      {
        path: "/deshbord/customers",
        element: <Customers />,
      },
      {
        path: "/deshbord/customer/:id",
        element: <EditCustomer />,
      },
      {
        path: "/deshbord/userOrders",
        element: <UserOrder />,
      },
      {
        path: "/deshbord/Orders",
        element: <AdminOrders />,
      },
    ],
  },
]);

export default router;
