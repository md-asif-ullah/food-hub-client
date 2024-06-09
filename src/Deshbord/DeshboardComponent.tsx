import { Separator } from "@/components/ui/separator";
import DeshboardSidebar from "./shared/DeshboardSidebar";

function DeshboardComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className=" hidden lg:flex">
        <div className="pt-28">
          <DeshboardSidebar />
        </div>
        <Separator orientation="vertical" />
      </div>

      <div className="w-full pt-28">{children}</div>
    </div>
  );
}

export default DeshboardComponent;
