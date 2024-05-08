import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="max-w-8xl">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
