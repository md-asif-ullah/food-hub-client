import { RootState } from "@/redux/Store";
import { useGetCartItemQuery } from "@/redux/services/CartService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductSummary from "./ProductSummary";

interface Iprops {
  setTotalPayAmount: (value: number) => void;
}

function OrderSummary({ setTotalPayAmount }: Iprops) {
  const user = useSelector((state: RootState) => state.user.currentUser);
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
      <button className="bg-[#f58220] mt-7 text-white w-full py-4 px-5 rounded-xl hover:bg-orange-700 duration-700">
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
