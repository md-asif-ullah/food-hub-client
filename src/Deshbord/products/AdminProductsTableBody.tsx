import { Products } from "@/components/type";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteProductMutation } from "@/redux/services/ProductService";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

function AdminProductsTableBody({ product }: { product: Products }) {
  const { name, price, image, _id, description, quantity, discount, category } =
    product;

  const { toast } = useToast();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(_id).unwrap();
      if (res.success) {
        toast({
          title: "Success",
          description: res.message,
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
      <TableCell>
        <div className="flex space-x-2 items-center">
          <img
            src={image}
            alt={name}
            className="w-[50px] h-[50px] rounded-xl"
          />
          <h3>{name}</h3>
        </div>
      </TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{quantity}</TableCell>

      <TableCell>
        <p className="w-52">{description}</p>
      </TableCell>
      <TableCell>
        {discount ? (
          <p className="text-[#f58220]"> {discount}%</p>
        ) : (
          <p className="text-[#f58220]">No Discount</p>
        )}
      </TableCell>
      <TableCell>
        <Link to={`/deshbord/product/${_id}`}>
          <button className="text-[#f58220] border border-[#f58220] px-[20px] py-2 rounded-xl hover:text-white hover:bg-[#f58220] duration-700">
            Edit
          </button>
        </Link>
      </TableCell>
      <TableCell onClick={handleDelete}>
        <Trash className="text-red-700 cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}

export default AdminProductsTableBody;
