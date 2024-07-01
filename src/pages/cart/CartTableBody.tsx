import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteCartItemMutation,
  useUpdateQuantityMutation,
} from "@/redux/services/CartService";
import { useToast } from "@/components/ui/use-toast";
import { IProduct } from "@/components/type";
import { TableCell, TableRow } from "@/components/ui/table";

interface props {
  item: IProduct;
}

function CartTableBody({ item }: props) {
  const { _id, image, name, price, size, quantity } = item;

  const [UpdateQuantity] = useUpdateQuantityMutation();

  const [deleteCartItem] = useDeleteCartItemMutation();

  const { toast } = useToast();

  const [total, setTotal] = useState<number>(price);

  const handleHighQuantity = () => {
    setTotal((prevTotal) => prevTotal + price);
    UpdateQuantity({ _id, quantity: quantity + 1 });
  };

  const handleLowQuantity = () => {
    if (quantity > 1) {
      setTotal((prevTotal) => prevTotal - price);
      UpdateQuantity({ _id, quantity: quantity - 1 });
    }
  };

  // delete item using id

  const handleDelete = async () => {
    try {
      const res = await deleteCartItem(_id).unwrap();

      if (res.success) {
        toast({
          title: "Item deleted successfully",
          description: "Item has been removed from your cart.",
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
    <TableRow>
      <TableCell className="flex items-center p-5 space-x-4">
        <img className="w-14 h-14" src={image} alt="" />
        <h3 className="font-semibold">{name}</h3>
      </TableCell>
      <TableCell>{size}</TableCell>
      <TableCell>
        <div className=" w-[110px] py-[4px]  space-x-5 flex items-center justify-center border dark:border-[#1e293b] border-[#e2e8f0] rounded-2xl">
          {quantity === 1 ? (
            <i
              className="bg-[#fef2e8] dark:bg-[#1e293b] rounded-full p-[5px]"
              onClick={handleDelete}
            >
              <MdDeleteOutline className="cursor-pointer text-red-700 focus:outline-none" />
            </i>
          ) : (
            <button
              onClick={() => handleLowQuantity()}
              className="bg-[#fef2e8] dark:bg-[#1e293b] text-black dark:text-white py-[2px] px-[11px] rounded-full focus:outline-none"
            >
              -
            </button>
          )}
          <h4 className="dark:text-white text-black ">{quantity}</h4>

          <button
            onClick={() => handleHighQuantity()}
            className="bg-[#fef2e8] dark:bg-[#1e293b] text-black dark:text-white py-[2px] px-[9px] rounded-full focus:outline-none"
          >
            +
          </button>
        </div>
      </TableCell>
      <TableCell>{total.toFixed(2)}</TableCell>
    </TableRow>
  );
}

export default CartTableBody;
