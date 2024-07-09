import { Separator } from "@/components/ui/separator";
import DeshboardSidebar from "./shared/DeshboardSidebar";
import ProtectedRoutes from "@/components/ProtectedRoutes";

function DeshboardComponent({ children }: { children: JSX.Element }) {
  return (
    <div className="flex overflow-hidden">
      <div className=" hidden lg:flex">
        <div className="pt-28">
          <DeshboardSidebar />
        </div>
        <Separator orientation="vertical" />
      </div>

      <div className="w-full pt-28">
        <ProtectedRoutes>{children}</ProtectedRoutes>
      </div>
    </div>
  );
}

export default DeshboardComponent;
