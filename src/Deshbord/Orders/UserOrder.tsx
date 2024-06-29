import { useGetOrderByIdQuery } from "@/redux/services/OrderService";
import OrderCart from "./OrderCart";
import { IOrder } from "@/components/type";
import LoadingAnimation from "@/components/LoadingAnimation";
import useUser from "@/pages/hooks/useUser";

function UserOrder() {
  const user = useUser();
  const { data, isLoading, isError } = useGetOrderByIdQuery(user?._id || "");

  return (
    <div className="min-h-screen h-full bg-white dark:bg-[#020817] p-4 space-y-10 pb-20">
      {isLoading && <LoadingAnimation />}
      {isError && <p>something went wrong</p>}
      {data?.payload?.length === 0 && (
        <div className="text-center text-2xl font-bold dark:text-white text-black">
          Order not found
        </div>
      )}
      {data?.payload.map((order: IOrder) => (
        <div key={order._id}>
          <h1 className="md:text-2xl text-xl font-bold mb-4 text-black dark:text-[#d8dee7]">
            Your Order ID:
            <span className="text-[#f58220] ml-1">{order.orderId}</span> (
            {order.cartProducts?.length} items)
          </h1>
          <button
            className={`text-lg mb-6 border px-2  ${
              order.status === "cancelled"
                ? "text-red-600 border-red-600"
                : "text-[#28a745] border-[#28a745]"
            }
             ${
               order.status === "completed"
                 ? "text-[#f58220] border-[#f58220]"
                 : "text-[#28a745] border-[#28a745]"
             }
             ${
               order.status === "accepted"
                 ? "text-fuchsia-700 border-fuchsia-700"
                 : "text-[#28a745] border-[#28a745]"
             }`}
          >
            {order?.status}
          </button>
          <div className="grid sm:grid-cols-3 xl:grid-cols-5 mx-5 mt-5 gap-y-10">
            {order.cartProducts?.map((item) => (
              <OrderCart key={item._id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrder;
