import FoodCard from "@/components/FoodCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllProductsQuery } from "@/redux/services/ProductService";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosStar } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

interface IFormInput {
  minPrice: string;
  maxPrice: string;
}

const Dishes = () => {
  //query for search
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search query
  const debounceProduct = useDebounce(searchQuery, 500);
  // Fetch all products using rtk query
  const { data, isLoading, isError } = useGetAllProductsQuery(debounceProduct);

  const [searchParams, setSearchParams] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });
  const navigate = useNavigate();
  const { search } = useLocation();

  // Function to handle category

  const handleCategory = (category: string) => {
    setSearchParams((prevParams) => {
      const currentCategories = prevParams.category
        ? prevParams.category.split(",")
        : [];
      const isCategoryPresent = currentCategories.includes(category);

      const newCategories = isCategoryPresent
        ? currentCategories.filter((cat) => cat !== category)
        : [...currentCategories, category];

      const urlParams = new URLSearchParams(search);
      if (newCategories) urlParams.set("category", newCategories.join(","));
      navigate(`/dishes?${urlParams.toString()}`);
      return {
        ...prevParams,
        category: newCategories.join(","),
      };
    });
  };

  // Function to handle price

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const urlParams = new URLSearchParams(search);
    if (data.minPrice) urlParams.set("minPrice", data.minPrice);
    if (data.maxPrice) urlParams.set("maxPrice", data.maxPrice);

    navigate(`/dishes?${urlParams.toString()}`);
    setSearchParams((prevParams) => ({
      ...prevParams,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
    }));
  };
  // Function to handle rating

  const handleRating = (rating: number) => {
    const urlParams = new URLSearchParams(search);
    if (rating) urlParams.set("rating", rating.toString());

    navigate(`/dishes?${urlParams.toString()}`);

    setSearchParams((prevParams) => ({
      ...prevParams,
      rating: rating.toString(),
    }));
  };

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
    <div className="grid grid-cols-4 px-14 pt-20">
      <div className="mr-10">
        <h1 className="text-lg">CATEGORY</h1>
        <div className="mt-5">
          {checkboxText.map((text, index) => (
            <div
              onClick={() => handleCategory(text)}
              key={index}
              className="flex items-center mb-4 cursor-pointer"
            >
              <Checkbox checked={searchParams.category.includes(text)} />
              <label className="ms-2 font-medium text-gray-900 dark:text-[#6a7589]">
                {text}
              </label>
            </div>
          ))}
        </div>
        <hr className="mt-6 border-[#e2e8f0] dark:border-[#1e293b]" />
        <div className="mt-5">
          <h1 className="text-lg">PRICE</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between mt-5"
          >
            <input
              type="number"
              {...register("minPrice")}
              placeholder="Min"
              className="max-w-20 text-black pl-2 focus:outline-none border-[#1e293b] border"
            />
            <input
              type="number"
              {...register("maxPrice")}
              placeholder="Max"
              className="max-w-20 text-black pl-2 focus:outline-none border-[#1e293b] border"
            />
            <button
              type="submit"
              className="bg-[#f96f2b] px-4 text-sm py-1 rounded"
            >
              Apply
            </button>
          </form>
        </div>
        <hr className="mt-6 border-[#e2e8f0] dark:border-[#1e293b]" />
        <div className="mt-5">
          <h1 className="text-lg">Rating</h1>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div
              className="flex space-x-2 items-center mt-5 cursor-pointer"
              key={index}
              onClick={() => handleRating(rating)}
            >
              <Checkbox
                className="rounded-full mr-2 w-6 h-6"
                checked={Number(searchParams.rating) === rating}
              />
              {[...Array(5)].map((_, i) => (
                <IoIosStar
                  key={i}
                  className={`text-xl ${
                    i < rating ? "text-[#facc15]" : "text-[#475569]"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {isError ? (
              "Something went wrong! Please try again."
            ) : (
              <div className="space-y-11 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-5">
                {data?.payload?.products.map((product: any) => (
                  <FoodCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dishes;
