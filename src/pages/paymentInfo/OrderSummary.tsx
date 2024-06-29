import { useGetCartItemQuery } from "@/redux/services/CartService";
import { useState, useEffect } from "react";
import ProductSummary from "./ProductSummary";
import ProssingAnimation from "@/components/ProssingAnimation";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/useUser";

interface Iprops {
  setTotalPayAmount: (value: number) => void;
  isLoading: boolean;
}

function OrderSummary({ setTotalPayAmount, isLoading }: Iprops) {
  const user = useUser();
  const { data } = useGetCartItemQuery(user?._id);

  const cartProducts = data?.payload || [];

  const [cartItems] = useState(cartProducts);
  let subTotal = 0;

  if (data) {
    for (const item of cartProducts) {
      subTotal += item.price * item.quantity;
    }
  }

  const tax = (subTotal * 0.4) / 50;
  const total = subTotal + tax;

  useEffect(() => {
    setTotalPayAmount(total);
  }, [total, setTotalPayAmount]);

  return (
    <div className="border border-[#1e293b] w-full p-4 rounded-xl ">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div className="border-b border-[#1e293b]">
        {cartItems.map((item) => (
          <ProductSummary key={item._id} item={item} />
        ))}
      </div>
      <div className="space-y-3 mt-5">
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Sub-total</h4>
          <p>${subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Delivery</h4>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Tax</h4>
          <p>+${tax.toFixed(2)}</p>
        </div>
        <hr className="mt-6 border-[#1e293b] sm:mx-auto lg:mt-8" />
        <div className="flex justify-between">
          <h4>Total</h4>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      <Button className="w-full mt-4 py-6 text-white bg-[#f58220] hover:bg-orange-700 duration-500">
        {isLoading ? <ProssingAnimation /> : "Order Now"}
      </Button>
    </div>
  );
}

export default OrderSummary;
