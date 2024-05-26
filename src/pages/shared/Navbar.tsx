import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import UserAccount from "@/components/UserAccount";
import darkModeLogo from "../../assets/images/HomeImg/logo-light-vHhBX6Zj.png";
import lightModeLogo from "../../assets/images/HomeImg/logo-dark-Be4neTbs.png";
import ShopAndFavourite from "@/components/ShopAndFavourite";
import { useTheme } from "@/theme/useTheme";
import { ModeToggle } from "@/theme/modeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { SubmitHandler, useForm } from "react-hook-form";

interface page {
  name: string;
  path: string;
}
interface Inputs {
  search: string;
}

const sidePages: page[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dishes",
    path: "/dishes",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },

  {
    name: "Sign In",
    path: "/signin",
  },
  {
    name: "Sign Up",
    path: "/signup",
  },
];

const pages: page[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dishes",
    path: "/dishes",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { theme } = useTheme();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const urlparams = new URLSearchParams();
    urlparams.set("search", data.search);
    navigate(`/dishes?${urlparams.toString()}`);
  };

  return (
    <nav className="dark:bg-[#030617] bg-white sticky z-10 w-full top-0">
      <div className="px-4 sm:px-6 lg:px-10 border-gray-300 border-b dark:border-b-0">
        <div className="flex justify-between items-center  h-20">
          <Link to="/">
            <div className="hidden sm:block">
              {theme === "light" ? (
                <img className="sm:w-36 w-32 " src={lightModeLogo} alt="logo" />
              ) : (
                <img
                  className="sm:w-36 w-32 sm:block"
                  src={darkModeLogo}
                  alt="logo"
                />
              )}
            </div>
          </Link>

          <div className="hidden lg:flex">
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.path}
                className={`${
                  pathname === page.path
                    ? "text-[#f58220]"
                    : "dark:text-[#c2c7d0] text-black"
                } px-3 py-2 rounded-md text-lg font-medium`}
              >
                {page.name}
              </Link>
            ))}
          </div>

          <div className="inline-flex">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-52 mx-auto mr-10 relative"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoIosSearch className="text-lg text-black dark:text-white" />
              </div>
              <input
                type="search"
                {...register("search")}
                className="block w-full py-3 pl-10 text-sm rounded-lg focus:outline-none dark:bg-slate-800 text-black dark:text-white dark:border-black border-2"
                required
              />
            </form>
            <ModeToggle />
          </div>

          {user ? (
            <div className="md:flex items-center hidden space-x-1">
              <ShopAndFavourite />
              <UserAccount style="mr-5" />
            </div>
          ) : (
            <div className="sm:inline-flex rounded-md shadow-sm hidden">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* Mobile Navbar */}

          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleNavbar}
              className=" dark:text-gray-300  hover:bg-gray-700 hover:text-white pl-3 py-2 rounded-md text-sm font-medium"
            >
              {isOpen ? (
                <RxCross2 className="block h-6 w-6" />
              ) : (
                <RiMenu3Line className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <ul>
              {sidePages.map((page, index) => (
                <li key={index}>
                  <Link
                    to={page.path}
                    className={`${
                      pathname === page.path
                        ? "text-[#f58220]"
                        : "dark:text-white text-black"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#020617] border-t border-gray-200 dark:border-[#030617] px-10 md:hidden">
        <div className="px-2 sm:px-6 lg:px-10 flex justify-between items-center h-14">
          <ShopAndFavourite />
          <UserAccount />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
