import useUser from "@/pages/hooks/useUser";
import { CgProfile } from "react-icons/cg";
import { FaCarSide, FaUtensils } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";

import { MdFastfood } from "react-icons/md";

interface Pagetype {
  label: string;
  to: string;
  icon: JSX.Element;
}

function useDeshboardSegments() {
  const user = useUser();

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
        {
          label: "Dishes List",
          to: "/deshbord/dishes-list",
          icon: <MdFastfood />,
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
  return deshboardSegments;
}
export default useDeshboardSegments;
