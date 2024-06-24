import LoadingAnimation from "@/components/LoadingAnimation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetUsersQuery } from "@/redux/services/User";
import { IoIosSearch } from "react-icons/io";
import CustomerInfoTableBody from "./CustomerInfoTableBody";
import { User } from "@/components/type";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function Customers() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const limit = 5;

  // Fetch all users using rtk query
  const { data, isLoading, isError } = useGetUsersQuery({
    page,
    limit,
    search,
  });

  const AllUser = data?.payload?.users || [];

  const { totalPages } = data?.payload?.pagination || {};

  //pagination logic

  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  const handlePrevoiusPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  return (
    <div className=" pb-20 min-h-screen">
      <Helmet>
        <title>Customers | Best Online restaurant</title>
      </Helmet>
      <div className="lg:px-10 px-5">
        <div className="border border-[#e2e8f0] dark:border-[#1e293b] text-2xl rounded-t-xl">
          <h2 className="text-start p-5">Customers List</h2>
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
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Customer Since</TableHead>
              <TableHead>Edit User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllUser.map((user: User) => (
              <CustomerInfoTableBody key={user._id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="flex justify-end mt-10 sm:pr-5 lg:pr-10">
        <PaginationContent className="flex items-center">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevoiusPage}
              className={page === 1 ? "text-gray-500 cursor-not-allowed" : ""}
            />
          </PaginationItem>
          {pages.map((pg) => (
            <PaginationItem key={pg}>
              <PaginationLink
                onClick={() => setPage(pg)}
                className={`hover:bg-[#f58220] ${
                  page === pg ? "bg-[#f58220] text-white" : ""
                }`}
              >
                {pg}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={
                page === totalPages ? "text-gray-500 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Customers;
