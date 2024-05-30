import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosStar } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

interface IFormInput {
  minPrice: string;
  maxPrice: string;
}

interface Props {
  setMobileFilter: (value: boolean) => void;
  checkboxText: string[];
}

function SmallDeviceFiltering({ setMobileFilter, checkboxText }: Props) {
  const [searchParams, setSearchParams] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  // Fetch all products using rtk query

  const navigate = useNavigate();
  const { search } = useLocation();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const urlParams = new URLSearchParams(search);
    urlParams.set("minPrice", data.minPrice);
    urlParams.set("maxPrice", data.maxPrice);

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
    urlParams.set("rating", rating.toString());

    navigate(`/dishes?${urlParams.toString()}`);

    setSearchParams((prevParams) => ({
      ...prevParams,
      rating: rating.toString(),
    }));
  };

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
      urlParams.set("category", newCategories.join(","));
      navigate(`/dishes?${urlParams.toString()}`);
      return {
        ...prevParams,
        category: newCategories.join(","),
      };
    });
  };

  return (
    <div className=" absolute left-0 dark:bg-[#020617] z-20 h-full px-5 w-[63vh] lg:hidden">
      <div className="flex justify-between mt-5 items-center ">
        <h1 className="text-lg">Filter Optiong</h1>
        <RxCross2 onClick={() => setMobileFilter(false)} className="text-2xl" />
      </div>
      <hr className="mt-6 border-[#e2e8f0] dark:border-[#1e293b]" />

      <h1 className="text-lg mt-10">CATEGORY</h1>

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
  );
}

export default SmallDeviceFiltering;
