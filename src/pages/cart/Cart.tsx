import LoadingAnimation from "@/components/LoadingAnimation";
import { useGetCartItemQuery } from "@/redux/services/CartService";
import { Link } from "react-router-dom";
import SubCard from "./subCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartTableBody from "./CartTableBody";

function Cart() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data, isLoading, isError } = useGetCartItemQuery(user?._id);

  return (
    <div className="bg-[#040717] pt-20 overflow-auto">
      {isError && (
        <p className="text-red-700 text-center">
          Error: {"something went wrong"}
        </p>
      )}
      {isLoading && <LoadingAnimation />}
      <div className="h-full text-white md:px-10 xl:px-10 lg:px-4 px-4 lg:grid space-y-7 lg:space-y-0 lg:grid-cols-3 lg:gap-x-7 ">
        <div className="col-span-2">
          <div className="border border-[#1e293b] text-2xl rounded-t-xl">
            <h2 className="text-start p-5">Shopping Cart</h2>
          </div>
          <Table className="border border-[#e2e8f0] dark:border-[#1e293b]">
            <TableHeader>
              <TableRow className="dark:bg-[#0f172a] bg-[#f1f5f9]">
                <TableHead>PRODUCTS</TableHead>
                <TableHead>SIZE</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.payload?.map((item) => (
                <CartTableBody key={item._id} item={item} />
              ))}
            </TableBody>
          </Table>

          <div className="border border-[#1e293b] p-5 rounded-b-xl">
            <Link to="/dishes">
              <button className="text-[#f58220] border border-[#f58220] px-[20px] py-2 rounded-xl hover:text-white hover:bg-[#f58220] duration-700">
                Shop More
              </button>
            </Link>
          </div>
        </div>
        <SubCard data={data?.payload} />
      </div>
    </div>
  );
}

export default Cart;
