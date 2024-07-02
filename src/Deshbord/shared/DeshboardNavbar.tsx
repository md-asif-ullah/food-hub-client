import ligntlogo from "@/assets/images/HomeImg/logo-light-vHhBX6Zj.png";
import darklogo from "@/assets/images/HomeImg/logo-dark-Be4neTbs.png";
import { useTheme } from "@/theme/useTheme";
import { Link } from "react-router-dom";
import UserAccount from "@/components/UserAccount";
import { ModeToggle } from "@/theme/modeToggle";

function DeshboardNavbar() {
  const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-[#030617] h-20 fixed top-0 w-full flex justify-between items-center px-8 sm:px-14 shadow-md z-50">
      <Link to="/">
        <img
          className="sm:w-36 w-32"
          src={theme === "light" ? darklogo : ligntlogo}
          alt="logo"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <ModeToggle />
        <UserAccount />
      </div>
    </div>
  );
}

export default DeshboardNavbar;
