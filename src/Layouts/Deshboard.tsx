import DeshboardComponent from "@/Deshbord/DeshboardComponent";
import useUser from "@/pages/hooks/useUser";
import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

function Deshboard() {
  const user = useUser();

  return (
    <div>
      <Navbar />
      <DeshboardComponent>
        <Outlet />
      </DeshboardComponent>
      {user?.isAdmin ? null : <Footer />}
    </div>
  );
}

export default Deshboard;
