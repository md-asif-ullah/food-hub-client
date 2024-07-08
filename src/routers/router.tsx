import AddItem from "@/Deshbord/AddItem/AddItem";
import AdminProducts from "@/Deshbord/Admin/products/AdminProducts";
import EditProducts from "@/Deshbord/Admin/products/EditProducts";
import AdminOrders from "@/Deshbord/AdminOrders/AdminOrders";
import UserOrder from "@/Deshbord/Orders/UserOrder";
import Profile from "@/Deshbord/Profile/Profile";
import Customers from "@/Deshbord/customers/Customers";
import EditCustomer from "@/Deshbord/customers/EditCustomer";
import Deshboard from "@/Layouts/Deshboard";
import Main from "@/Layouts/Main";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import VerifyOtp from "@/components/VarifyOtp";
import About from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import Cart from "@/pages/cart/Cart";
import ContectUs from "@/pages/contact/Contact";
import Dishes from "@/pages/dishes/Dishes";
import ErrorPage from "@/pages/error/ErrorPage";
import Favourite from "@/pages/favourite/Favourite";
import Login from "@/pages/login/login";
import OrderInfo from "@/pages/paymentInfo/OrderInfo";
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
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/payment-info",
        element: (
          <ProtectedRoutes>
            <OrderInfo />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/favourite",
        element: (
          <ProtectedRoutes>
            <Favourite />
          </ProtectedRoutes>
        ),
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
    errorElement: <ErrorPage />,
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
      {
        path: "/deshbord/dishes-list",
        element: <AdminProducts />,
      },
      {
        path: "/deshbord/product/:id",
        element: <EditProducts />,
      },
    ],
  },
]);

export default router;
