import { IProduct } from "@/components/type";

function OrderCart({ item }: { item: IProduct }) {
  const { image, name, price, size, quantity } = item;

  return (
    <div className="">
      <img className="w-20 h-20 object-cover rounded" src={image} alt={name} />
      <div>
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-gray-500">${price}</p>
        <p className="text-gray-500">Size: {size}</p>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
    </div>
  );
}

export default OrderCart;
