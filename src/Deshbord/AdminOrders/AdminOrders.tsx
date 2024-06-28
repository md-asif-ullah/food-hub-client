import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminTableBody from "./AdminTableBody";
import LoadingAnimation from "@/components/LoadingAnimation";
import { IOrder } from "@/components/type";
import { useGetOrdersQuery } from "@/redux/services/OrderService";

function AdminOrders() {
  const { data, isLoading, isError } = useGetOrdersQuery();

  return (
    <div className="h-full">
      {isLoading && <LoadingAnimation />}
      {isError && <div>Something went wrong</div>}
      {data?.payload?.length === 0 && (
        <div className="text-center text-2xl mt-10">No Orders Found</div>
      )}
      <div className="px-10">
        <div className="border border-[#e2e8f0] dark:border-[#1e293b] text-2xl rounded-t-xl">
          <h2 className="text-start p-5">Order History</h2>
        </div>
        <div className="border border-[#e2e8f0] dark:border-[#1e293b] rounded-b-xl">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="whitespace-nowrap">Order ID</TableHead>
                <TableHead>Dishes</TableHead>
                <TableHead className="whitespace-nowrap">Total Price</TableHead>
                <TableHead className="whitespace-nowrap">
                  Phone Number
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Payment Method
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="whitespace-nowrap">
                  Company Name
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.payload?.map((order: IOrder) => (
                <AdminTableBody key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
