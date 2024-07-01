import { CgProfile } from "react-icons/cg";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "@/redux/services/User";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/user/UserSlice";
import { useToast } from "./ui/use-toast";
import { persistor } from "@/redux/Store";
import useDeshboardSegments from "./hooks/useDeshboardSegments";

function UserAccount({ style }: { style?: string }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [logOut] = useLogOutMutation();

  const deshboardSegments = useDeshboardSegments();

  const handleLogOut = async () => {
    try {
      const res = await logOut().unwrap();

      if (res.success) {
        dispatch(clearUser());
        persistor.purge().then(() => {
          toast({
            title: "Sign out successfully",
            description: "You can now login to your account.",
          });
        });
      }
    } catch (error: any) {
      if (error.data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.data.message,
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <CgProfile className="text-2xl text-[#030617] dark:text-[#b0b295]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 my-3 ${style}`}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {deshboardSegments.map((page, index) => (
            <Link to={page.to} key={index}>
              <DropdownMenuItem>
                <i className="mr-2 h-4 w-4">{page.icon}</i>
                <span>{page.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAccount;
