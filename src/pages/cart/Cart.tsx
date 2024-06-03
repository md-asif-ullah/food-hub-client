import LoadingAnimation from "@/components/LoadingAnimation";
import { useGetCartItemQuery } from "@/redux/services/CartService";
import { Link } from "react-router-dom";
import SubCard from "./subCard";
import TableBody from "./TableBody";
import { useState } from "react";

function Cart() {
  const { data, isLoading, isError } = useGetCartItemQuery();
  const [quantityPrice, setQuantityPrice] = useState(null);
  console.log(data, isLoading, isError);

  const quantityTotalPrice = (price: any) => {
    setQuantityPrice((prev) => prev + price);
  };
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
          <div className="overflow-x-auto">
            <table className="md:w-full w-[550px]">
              <thead className="border border-[#1e293b] bg-[#090d1f]">
                <tr className="text-[#64748b]">
                  <th className="text-start p-3">PRODUCTS</th>
                  <th className="text-start p-3">SIZE</th>
                  <th className="text-start p-3">Quantity</th>
                  <th className="text-start p-3">TOTAL</th>
                </tr>
              </thead>
              {data?.payload?.map((item) => (
                <TableBody
                  key={item._id}
                  item={item}
                  quantityTotalPrice={quantityTotalPrice}
                />
              ))}
            </table>
          </div>
          {/* Close the div here */}
          <div className="border border-[#1e293b] p-5 rounded-b-xl">
            <Link to="/dishes">
              <button className="text-[#f58220] border border-[#f58220] px-[20px] py-2 rounded-xl hover:text-white hover:bg-[#f58220] duration-700">
                Shop More
              </button>
            </Link>
          </div>
        </div>
        <SubCard data={data?.payload} quantityPrice={quantityPrice} />
      </div>
    </div>
  );
}

export default Cart;
