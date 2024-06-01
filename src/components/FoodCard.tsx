import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

type product = {
  product: {
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    _id: string;
  };
};

function FoodCard({ product }: product) {
  const { name, price, image, rating, _id } = product;

  return (
    <Link to={`/product/${_id}`}>
      <div
        className={`border border-stone-800 group hover:border-orange-500 transition duration-300 dark:bg-[#020617] bg-white rounded-lg p-3 cursor-pointer`}
      >
        <img
          className="h-[255px] w-full lg:h-[210px] object-cover rounded-md"
          src={image}
        />
        <h3 className="text-white text-2xl tracking-wide font-bold mt-2">
          {name}
        </h3>
        <div className=" bottom-2 space-y-1">
          <div className="inline-flex">
            <i className=" text-[#facc15] mt-1 mr-1">
              <IoIosStar className="" />
            </i>
            <p className="text-black dark:text-white">{rating}</p>
          </div>

          <p className="text-amber-500 text-xl font-medium">${price}</p>
        </div>
      </div>
    </Link>
  );
}

export default FoodCard;
