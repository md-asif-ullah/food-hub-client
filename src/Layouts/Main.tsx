import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="max-w-8xl">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
