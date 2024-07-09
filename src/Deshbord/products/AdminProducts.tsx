import LoadingAnimation from "@/components/LoadingAnimation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { useGetProductsForAdminQuery } from "@/redux/services/ProductService";
import AdminProductsTableBody from "./AdminProductsTableBody";

function AdminProducts() {
  const [search, setSearch] = useState<string>("");

  // Fetch all products using rtk query

  const { data, isLoading, isError } = useGetProductsForAdminQuery({
    search,
  });
  const productsData = data?.payload || [];

  return (
    <div className=" pb-20 min-h-screen">
      <Helmet>
        <title>Customers | Best Online restaurant</title>
      </Helmet>
      <div className="lg:px-10 px-5">
        <div className="border border-[#e2e8f0] dark:border-[#1e293b] text-2xl rounded-t-xl">
          <h2 className="text-start p-5">Dishes List</h2>
        </div>
        {isLoading && <LoadingAnimation />}
        {isError && (
          <p className="text-red-700 text-center">
            Error: {"something went wrong"}
          </p>
        )}
        <div className="border border-[#e2e8f0] dark:border-[#1e293b] text-2xl">
          <form className="max-w-80 ml-10 my-5 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoIosSearch className="text-lg text-black dark:text-white" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search..."
              className="block w-full py-3 pl-10 text-sm rounded-lg focus:outline-none dark:bg-[#020617] text-black dark:text-white dark:border-[#1e293b] border"
              required
            />
          </form>
        </div>
        <Table className="border border-[#e2e8f0] dark:border-[#1e293b]">
          <TableHeader>
            <TableRow className="dark:bg-[#0f172a] bg-[#f1f5f9]">
              <TableHead>Dish Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>description</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product: any) => (
              <AdminProductsTableBody key={product._id} product={product} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminProducts;
