import { IProduct } from "@/components/type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface props {
  data: IProduct[] | undefined;
}

function SubCard({ data }: props) {
  let subTotal = 0;

  if (data) {
    for (const item of data) {
      subTotal += item.price * item.quantity;
    }
  }
  const tax = (subTotal * 0.4) / 50;
  const total = subTotal + tax;

  return (
    <div className="border border-[#1e293b] w-full p-4 rounded-xl lg:h-[290px]">
      <h2 className="text-xl font-semibold">Cart Total</h2>
      <div className="space-y-3 mt-5">
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Sub-total</h4>
          <p>${subTotal.toFixed(3)}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Delivery</h4>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#627188]">Tax</h4>
          <p>+${tax.toFixed(3)}</p>
        </div>
        <hr className="mt-6 border-[#1e293b] sm:mx-auto lg:mt-8" />
        <div className="flex justify-between">
          <h4>Total</h4>
          <p>${total.toFixed(3)}</p>
        </div>
      </div>
      <Link to="/payment-info">
        <Button className="w-full mt-4 py-6 text-white bg-[#f58220] hover:bg-orange-700 duration-500">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}

export default SubCard;
