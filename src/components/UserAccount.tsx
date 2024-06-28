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
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/user/UserSlice";
import { useToast } from "./ui/use-toast";
import { FaCarSide, FaUtensils } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RootState, persistor } from "@/redux/Store";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function UserAccount({ style }: { style?: string }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const user = useSelector((state: RootState) => state.user.currentUser);
  const [logOut] = useLogOutMutation();

  const isAdmin = user?.isAdmin;

  const deshboardSegments: Pagetype[] = isAdmin
    ? [
        {
          label: "Profile",
          to: "/deshbord/profile",
          icon: <CgProfile />,
        },
        {
          label: "Orders",
          to: "/deshbord/Orders",
          icon: <FaCarSide />,
        },
        {
          label: "Customers",
          to: "/deshbord/customers",
          icon: <IoIosPeople />,
        },
        {
          label: "Add Item",
          to: "/deshbord/additem",
          icon: <FaUtensils />,
        },
      ]
    : [
        {
          label: "Profile",
          to: "/deshbord/profile",
          icon: <CgProfile />,
        },
        {
          label: "My Orders",
          to: "/deshbord/userOrders",
          icon: <FaCarSide />,
        },
      ];

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
