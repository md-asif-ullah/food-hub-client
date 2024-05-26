import { IoIosStar } from "react-icons/io";

type product = {
  product: {
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
  };
};

function FoodCard({ product }: product) {
  const { name, price, description, image, rating } = product;

  return (
    <div
      className={`border border-stone-800 group relative hover:border-orange-500 transition duration-300 dark:bg-[#020617] bg-white rounded-lg p-3 h-[420px] cursor-pointer`}
    >
      <img
        className="h-[255px] w-full lg:h-[210px] object-cover rounded-md"
        src={image}
      />
      <h3 className="text-white text-2xl tracking-wide font-bold mt-2">
        {name}
      </h3>
      <p className="text-[#64748b] mt-2">{description}</p>
      <div className="absolute bottom-2 space-y-1">
        <div className="flex justify-center lg:justify-start">
          <i className=" text-[#facc15] mt-1 mr-1">
            <IoIosStar className="" />
          </i>
          <p className="text-black dark:text-white">{rating}</p>
        </div>

        <p className="text-amber-500 text-xl font-medium">${price}</p>
      </div>
    </div>
  );
}

export default FoodCard;
