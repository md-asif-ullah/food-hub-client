import { IProduct } from "@/components/type";
import { RxCross2 } from "react-icons/rx";

interface IProps {
  item: IProduct;
}

function ProductSummary({ item }: IProps) {
  const { name, image, price, quantity } = item;
  return (
    <div className="flex items-center space-x-4 py-2 ">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={image}
        alt={name}
      />
      <div>
        <h4 className="font-medium text-[#cbd5e1]">{name}</h4>
        <p className="flex items-center space-x-1 text-[#626d81]">
          <span>{quantity}</span> <RxCross2 />
          <span className="text-[#f97316]">${price.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductSummary;
