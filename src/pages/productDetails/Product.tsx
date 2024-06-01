import { useParams } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";
import {
  useGetPopularProductsQuery,
  useGetProductQuery,
} from "@/redux/services/ProductService";
import { MdOutlineFavorite } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import FoodCard from "@/components/FoodCard";
import Rating from "@/components/Rating";

function Product() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductQuery(id!);
  const { data: popularProduct } = useGetPopularProductsQuery();

  const [buttonStyle, setButtonStyle] = useState<string>("");

  const { image, name, price, description, rating } = data?.payload || {};
  return (
    <div className="mt-32 h-full mx-5 md:mx-10 xl:mx-20">
      {isLoading && <LoadingAnimation />}
      {error && <p>product not found</p>}
      <div className="lg:grid lg:grid-cols-2">
        <img
          src={image}
          className="md:w-full lg:h-[400px] md:h-[450px]"
          alt="product"
        />
        <div className="lg:mt-0 mt-5 lg:ml-5">
          <div className="flex justify-between items-center text-2xl font-bold">
            <h1>{name}</h1>
            <p>${price}</p>
          </div>
          <p className="text-[#64748b] text-lg">
            by <span className="text-[#94a3b8]">Healthy Feast Corner</span>
          </p>
          <div>
            <Rating rating={rating} />
          </div>
          <p className="text-[#57657b] text-sm mt-3">{description}</p>
          <div className="flex items-center space-x-2 mt-4">
            <p className="mt-2">Size:</p>
            <div className="flex items-center mt-3 space-x-2">
              <button
                onClick={() => setButtonStyle("s")}
                className={`px-3 py-[3px] rounded-full  ${
                  buttonStyle === "s" ? "bg-[#f58220]" : "bg-[#1e293b]"
                }`}
              >
                S
              </button>
              <button
                onClick={() => setButtonStyle("m")}
                className={`px-[10px] py-[4px] rounded-full  ${
                  buttonStyle === "m" ? "bg-[#f58220]" : "bg-[#1e293b]"
                }`}
              >
                M
              </button>
              <button
                onClick={() => setButtonStyle("l")}
                className={`px-3 py-[4px] rounded-full  ${
                  buttonStyle === "l" ? "bg-[#f58220]" : "bg-[#1e293b]"
                }`}
              >
                L
              </button>
            </div>
          </div>
          <div className="flex items-center mt-10 space-x-2">
            <button className="secondary_button inline-flex bg-[#f58220] hover:bg-orange-700 px-4 space-x-2">
              <IoCartOutline />
              <span className="text-base">Add to Cart</span>
            </button>
            <MdOutlineFavorite className="hover_effcet text-3xl bg-black hover:text-red-600" />
          </div>
        </div>
      </div>
      <div className="mt-14">
        <h1 className="text-2xl font-bold mt-5">Popular Products</h1>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularProduct?.payload.map((product: any) => (
            <FoodCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
