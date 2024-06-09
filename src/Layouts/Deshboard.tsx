import DeshboardComponent from "@/Deshbord/DeshboardComponent";
import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

function Deshboard() {
  return (
    <div>
      <Navbar />
      <DeshboardComponent>
        <Outlet />
      </DeshboardComponent>
      <Footer />
    </div>
  );
}

export default Deshboard;
