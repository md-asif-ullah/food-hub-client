import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosStar } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

interface IFormInput {
  minPrice: string;
  maxPrice: string;
}
interface Props {
  checkboxText: string[];
  searchParams: {
    category: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
  };
  setSearchParams: Dispatch<
    SetStateAction<{
      category: string;
      minPrice: string;
      maxPrice: string;
      rating: string;
    }>
  >;
}

function BigDeviceFiltering({
  checkboxText,
  setSearchParams,
  searchParams,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Function to handle category

  const handleCategory = (category: string) => {
    setSearchParams((prevParams: any) => {
      const currentCategories = prevParams.category
        ? prevParams.category.split(",")
        : [];
      const isCategoryPresent = currentCategories.includes(category);

      const newCategories = isCategoryPresent
        ? currentCategories.filter((cat: any) => cat !== category)
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

  // Function to handle price

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const urlParams = new URLSearchParams(search);
    urlParams.set("minPrice", data.minPrice);
    urlParams.set("maxPrice", data.maxPrice);

    navigate(`/dishes?${urlParams.toString()}`);
    setSearchParams((prevParams: any) => ({
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

    setSearchParams((prevParams: any) => ({
      ...prevParams,
      rating: rating.toString(),
    }));
  };

  return (
    <div className="mr-10 pt-20 lg:block hidden lg:relative">
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
  );
}

export default BigDeviceFiltering;
