import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { FiDollarSign } from "react-icons/fi";
import paypalIcon from "@/assets/images/paymentIcon/download.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrderSummary from "./OrderSummary";
import { useState } from "react";
import { useGetCartItemQuery } from "@/redux/services/CartService";
import { useAddOrderMutation } from "@/redux/services/OrderService";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

interface FormType {
  name: string;
  companyName?: string;
  address: string;
  phoneNumber: number;
  message: string;
}

function OrderInfo() {
  const [totalPayAmount, setTotalPayAmount] = useState<number>(0);
  const [selectePaymentOption, setSelectePaymentOption] = useState("");
  const [error, setError] = useState<string>("");

  // get user data
  const user = useUser();
  const { data } = useGetCartItemQuery(user?._id);

  const { name, phone, address } = user || {};
  const cartProducts = data?.payload || [];

  // add order
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const { toast } = useToast();
  const orderId = Math.floor(100000000 * Math.random() * 10);

  // handle payment option

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectePaymentOption(event.target.value);
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    const { name, companyName, address, phoneNumber, message } = data;
    if (!selectePaymentOption)
      return setError("Please select a payment method");

    setError("");
    const newOrderData = {
      userId: user?._id,
      orderId,
      name,
      companyName,
      address,
      phoneNumber,
      message,
      paymentMethod: selectePaymentOption,
      totalPayAmount,
      cartProducts,
      status: "pending",
    };
    try {
      const res = await addOrder(newOrderData).unwrap();
      if (res.success) {
        <Link to="/dishes" />;
        toast({
          title: "Order Placed Successfully",
          description: res.message,
        });
      }
    } catch (error: any) {
      if (error.data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.data.message,
        });
      }
    }
  };

  return (
    <form className="p-5 md:px-14" onSubmit={handleSubmit(onSubmit)}>
      <div className="xl:pt-28 lg:pt-20 pt-10 lg:grid lg:grid-cols-10 gap-10 xl:gap-20 bg-white dark:bg-[#020617]">
        <div className="text-white min-h-[80vh] col-span-6">
          <div className="xl:col-span-2 mt-14 xl:mt-0">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Label className="text-[#17172a] dark:text-white">Name</Label>
                <Input
                  type="text"
                  defaultValue={name}
                  placeholder="Enter your name"
                  className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-700">
                    This field is required
                  </span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Label className="text-[#17172a] dark:text-white">
                  Company Name
                  <span className="hidden sm:inline"> (Optional)</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                  {...register("companyName")}
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">
                Phone Number
              </Label>
              <Input
                type="number"
                placeholder="Phone Number"
                defaultValue={phone}
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Address </Label>
              <Textarea
                className="focus:border-[#f58220] mt-2 pb-16 text-black dark:text-white"
                {...register("address", { required: true })}
                placeholder="Enter your address (e.g. 123 Main St, New York, NY 10030)"
                defaultValue={address}
              />
              {errors.address && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Payment Option
            </h1>
            <RadioGroup
              name="paymentMethod"
              onChange={handleChange}
              className="flex flex-col sm:flex-row justify-between items-center max-w-[656px] h-auto border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg px-10 py-5 space-y-5 sm:space-y-0 sm:space-x-5"
            >
              <div className="flex flex-col items-center space-y-5 cursor-pointer">
                <Label
                  htmlFor="cash-on-delivery"
                  className="cursor-pointer text-center flex flex-col items-center"
                >
                  <FiDollarSign className="text-3xl text-[#f58220]" />
                  <span className="w-20 mt-2 text-black dark:text-white">
                    Cash on Delivery
                  </span>
                </Label>
                <RadioGroupItem
                  id="cash-on-delivery"
                  value="cash-on-delivery"
                />
              </div>
              <div className="flex flex-col items-center space-y-5 cursor-pointer w-20">
                <Label
                  htmlFor="Paypal"
                  className="text-center cursor-pointer flex flex-col items-center"
                >
                  <img src={paypalIcon} alt="Paypal" className="h-8 w-8" />
                  <span className="w-20 mt-2 text-black dark:text-white">
                    Paypal
                  </span>
                </Label>
                <RadioGroupItem value="Paypal" id="Paypal" />
              </div>
            </RadioGroup>
          </div>
          {error && <span className="text-red-700">{error}</span>}
          <div className="mt-10">
            <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Additional Information
            </h1>
            <div className="relative z-0 w-full mb-5">
              <Label className="text-[#17172a] dark:text-white">
                Message (optional)
              </Label>
              <Textarea
                className="focus:border-[#f58220] mt-2 pb-16 text-black dark:text-white"
                {...register("message", { required: false })}
                placeholder="Note to the seller (e.g. special delivery instructions)"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 col-span-4">
          <OrderSummary
            setTotalPayAmount={setTotalPayAmount}
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
}

export default OrderInfo;
