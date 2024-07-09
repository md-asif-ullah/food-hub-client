import { TableCell, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";
import UpdateOrderStatus from "./UpdateOrderStatus";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteOrderMutation } from "@/redux/services/OrderService";

function AdminTableBody({ order }: any) {
  const {
    _id,
    createdAt,
    orderId,
    cartProducts,
    totalPayAmount,
    phoneNumber,
    paymentMethod,
    address,
    message,
    companyName,
    status,
  } = order;

  const [deleteOrder] = useDeleteOrderMutation();

  const { toast } = useToast();

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder(_id).unwrap();
      if (res.success) {
        toast({
          title: "order deleted successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "order update failed.",
        description: error.message,
      });
    }
  };

  return (
    <TableRow className="bg-white dark:bg-[#020817] border-b hover:bg-gray-50">
      <TableCell className="pr-3 py-4 whitespace-nowrap text-sm font-medium text-gray-dark:text-white">
        {formattedDate}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-dark:text-white">
        {orderId}
      </TableCell>
      <TableCell className="pr-14 py-4 whitespace-nowrap text-sm text-gray-dark:text-white">
        {cartProducts?.map((product: any) => (
          <div
            key={product._id}
            className="flex items-center mt-2 border-b border-gray-200 space-x-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 rounded-md"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {product.name}
              </p>
              <div className="flex space-x-2 text-sm text-gray-600 dark:text-white">
                <p>Qty: {product.quantity}</p>
                <p>Size: {product.size}</p>
              </div>
            </div>
          </div>
        ))}
      </TableCell>
      <TableCell className="pr-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {totalPayAmount.toFixed(2)}
      </TableCell>
      <TableCell className="pr-3 pl-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {phoneNumber}
      </TableCell>
      <TableCell className="pr-3 pl-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {paymentMethod}
      </TableCell>
      <TableCell className="pr-3 pl-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {address}
      </TableCell>
      <TableCell className="text-sm text-gray-900 dark:text-white">
        <p className="w-52">{message}</p>
      </TableCell>
      <TableCell className=" py-4 text-sm text-gray-900 dark:text-white">
        {companyName}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <UpdateOrderStatus id={_id} status={status} />
      </TableCell>
      <TableCell className=" font-medium text-red-700">
        <Trash onClick={handleDeleteOrder} className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}

export default AdminTableBody;
