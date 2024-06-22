import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface CustomerInfoTableBodyProps {
  user: {
    _id: string;
    name: string;
    phone?: string;
    email: string;
    updatedAt: string;
    isAdmin: boolean;
    isBanned: boolean;
  };
}

function CustomerInfoTableBody({ user }: CustomerInfoTableBodyProps) {
  const { _id, name, phone, email, updatedAt, isAdmin, isBanned } = user;

  const date = new Date(updatedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <TableRow key={_id}>
      <TableCell>{name}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Link to={`/deshbord/customer/${_id}`}>
          <button className="text-[#f58220] border border-[#f58220] px-[20px] py-2 rounded-xl hover:text-white hover:bg-[#f58220] duration-700">
            Edit
          </button>
        </Link>
      </TableCell>
      <TableCell>
        {isAdmin ? (
          <p className="text-red-600 font-semibold ">Admin</p>
        ) : (
          <p className="text-blue-600 font-semibold">Customer</p>
        )}
      </TableCell>
      <TableCell>
        {isBanned ? (
          <p className="text-[#ef433a] bg-[#fdecec] dark:bg-[#1a0c1c] pl-2 py-1 rounded-md">
            Blocked
          </p>
        ) : (
          <p className="text-[#22c55e] bg-[#e8f9ef] dark:bg-[#05191f] pl-2 py-1 rounded-md">
            Active
          </p>
        )}
      </TableCell>
    </TableRow>
  );
}

export default CustomerInfoTableBody;
