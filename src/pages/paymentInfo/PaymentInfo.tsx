import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { FiDollarSign } from "react-icons/fi";
import paypalIcon from "@/assets/images/paymentIcon/download.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useState } from "react";
import { useGetCartItemQuery } from "@/redux/services/CartService";

interface FormType {
  name: string;
  companyName?: string;
  address: string;
  number: number;
  message: string;
}

function PaymentInfo() {
  const [totalPayAmount, setTotalPayAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState("");
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data } = useGetCartItemQuery(user?._id);

  const { name, phone, address } = user || {};
  const cartProducts = data?.payload || [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  console.log(selectedOption);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    const { name, companyName, address, number, message } = data;

    const newOrderData = {
      name,
      companyName,
      address,
      number,
      message,
      totalPayAmount,
      cartProducts,
    };
    console.log(newOrderData);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-28 xl:px-14 px-5 grid grid-cols-8 gap-20 bg-[#020617]">
        <div className="text-white min-h-[80vh] col-span-5">
          <div className="xl:col-span-2 mt-14 xl:mt-0 ">
            <div className="grid grid-cols-2 gap-6">
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
                  Company Name (Optional)
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
                {...register("number", { required: true })}
              />
              {errors.number && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Address </Label>
              <Textarea
                className=" focus:border-[#f58220] mt-2 pb-16 text-black dark:text-white"
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
            <h1 className="text-xl font-semibold mb-4">Payment Option</h1>
            <RadioGroup
              name="paymentMethod"
              onChange={handleChange}
              className="flex justify-between max-w-[656px] h-[200px] border border-[#1e293b] rounded-lg px-20 py-10"
            >
              <div className="flex flex-col items-center space-y-5 cursor-pointer">
                <Label
                  htmlFor="cash-on-delivery"
                  className="cursor-pointer text-center flex flex-col items-center"
                >
                  <FiDollarSign className="text-3xl text-[#f58220]" />
                  <span className="w-20 mt-2">Cash on Delivery</span>
                </Label>
                <RadioGroupItem value="cash-on-delivery" />
              </div>
              <div className="flex flex-col items-center space-y-5 cursor-pointer w-20">
                <Label
                  htmlFor="option-two"
                  className="text-center cursor-pointer flex flex-col items-center"
                >
                  <img src={paypalIcon} alt="Paypal" className="h-8 w-8" />
                  <span className="w-20 mt-2">Paypal</span>
                </Label>
                <RadioGroupItem value="option-two" id="option-two" />
              </div>
            </RadioGroup>
          </div>
          <div className=" mt-10">
            <h1 className="text-xl font-semibold mb-4">
              Additional Information
            </h1>
            <div className="relative z-0 w-full mb-5">
              <Label className="text-[#17172a] dark:text-white">
                Message (optional)
              </Label>
              <Textarea
                className=" focus:border-[#f58220] mt-2 pb-16 text-black dark:text-white"
                {...register("message", { required: true })}
                placeholder="Note to the seller (e.g. special delivery instructions)"
              />
              {errors.address && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <OrderSummary setTotalPayAmount={setTotalPayAmount} />
        </div>
      </div>
    </form>
  );
}

export default PaymentInfo;
