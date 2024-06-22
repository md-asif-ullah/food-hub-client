import FoodCard from "@/components/FoodCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useGetAllProductsQuery } from "@/redux/services/ProductService";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import SmallDeviceFiltering from "./SmallDeviceFiltering";
import BigDeviceFiltering from "./BigDeviceFiltering";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Dishes = () => {
  //query for search
  const [searchQuery, setSearchQuery] = useState("");

  const [mobileFilter, setMobileFilter] = useState(false);

  const [searchParams, setSearchParams] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  // Debounce search query
  const debounceProduct = useDebounce(searchQuery, 500);
  // Fetch all products using rtk query
  const { data, isLoading, isError } = useGetAllProductsQuery(debounceProduct);

  const { search } = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    urlParams.get("search");
    const categoryFromUrl = urlParams.get("category");
    const minPriceFromUrl = urlParams.get("minPrice");
    const maxPriceFromUrl = urlParams.get("maxPrice");
    const ratingFromUrl = urlParams.get("rating");

    setSearchParams({
      category: categoryFromUrl || "",
      minPrice: minPriceFromUrl || "",
      maxPrice: maxPriceFromUrl || "",
      rating: ratingFromUrl || "",
    });

    const searchQuery = urlParams.toString();

    setSearchQuery(searchQuery);
  }, [search]);

  const checkboxText = ["Coffee", "Pizza", "Burger", "Noodles", "Dessert"];

  return (
    <>
      <Helmet>
        <title>Dishes | Best Online restaurant</title>
      </Helmet>
      <div className="grid lg:grid-cols-4 xl:px-14 px-4 relative h-full min-h-[200vh] lg:min-h-0 pt-32">
        <BigDeviceFiltering
          checkboxText={checkboxText}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />

        {/* Mobile Filter Section */}

        {mobileFilter && (
          <SmallDeviceFiltering
            setMobileFilter={setMobileFilter}
            checkboxText={checkboxText}
          />
        )}

        <div className="col-span-3 ">
          <div>
            <button
              onClick={() => setMobileFilter(!mobileFilter)}
              className="inline-flex items-center gap-4 rounded-full border border-default-200 px-4 py-2.5 text-sm text-default-950 transition-all lg:hidden mb-5  xl:px-5"
              type="button"
            >
              Filter
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
            </button>
          </div>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              {isError ? (
                "Something went wrong! Please try again."
              ) : (
                <div className=" grid xl:grid-cols-3 md:grid-cols-2 gap-5 ">
                  {data?.payload?.products.map((product: any) => (
                    <FoodCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dishes;
