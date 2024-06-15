function OrderSummary({ cartProducts, data, quantityPrice }: any) {
  let subTotal = 0 + quantityPrice;

  if (data) {
    for (const item of data) {
      subTotal += item.price;
    }
  }
  const tax = (subTotal * 0.4) / 50;
  const total = subTotal + tax;

  console.log(cartProducts);

  return (
    <div className="border border-[#1e293b] w-full p-4 rounded-xl lg:h-[310px]">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div></div>
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
          <p>{total.toFixed(3)}</p>
        </div>
      </div>
      <button className="bg-[#f58220] mt-7 text-white  w-full py-4 px-5 rounded-xl hover:bg-orange-700 duration-700">
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
