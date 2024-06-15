import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { FiDollarSign } from "react-icons/fi";
import paypalIcon from "@/assets/images/paymentIcon/download.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrderSummary from "./OrderSummary";

interface FormType {
  name: string;
  companyName?: string;
  address: string;
  number: number;
}

function PaymentInfo() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    console.log(data);
  };

  return (
    <div className="pt-28 xl:px-14 px-5 grid grid-cols-8 gap-20 bg-[#020617]">
      <div className="text-white min-h-[80vh] col-span-5">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="xl:col-span-2 mt-14 xl:mt-0 ">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Label className="text-[#17172a] dark:text-white">Name</Label>
                <Input
                  type="number"
                  placeholder="Price"
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
                  placeholder="discount"
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
              />
              {errors.address && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </form>

        <div className="mt-10">
          <h1 className="text-xl font-semibold mb-4">Payment Option</h1>
          <RadioGroup
            className="flex justify-between max-w-[656px] h-[200px] border border-[#1e293b] rounded-lg px-20 py-10"
            defaultValue="option-one"
          >
            <div className="flex flex-col items-center space-y-5 cursor-pointer">
              <FiDollarSign className="text-3xl text-[#f58220]" />
              <Label
                htmlFor="option-one"
                className="cursor-pointer w-20 text-center"
              >
                Cash on Delivery
              </Label>
              <RadioGroupItem value="option-one" id="option-one" />
            </div>
            <div className="flex flex-col items-center space-y-5 cursor-pointer w-20">
              <img src={paypalIcon} alt="Paypal" className="h-8 w-8" />
              <Label
                htmlFor="option-two"
                className="text-center cursor-pointer"
              >
                Paypal
              </Label>
              <RadioGroupItem value="option-two" id="option-two" />
            </div>
          </RadioGroup>
        </div>
        <div className=" mt-10">
          <h1 className="text-xl font-semibold mb-4">Additional Information</h1>
          <div className="relative z-0 w-full mb-5">
            <Label className="text-[#17172a] dark:text-white">
              Message (optional)
            </Label>
            <Textarea
              className=" focus:border-[#f58220] mt-2 pb-16 text-black dark:text-white"
              {...register("address", { required: true })}
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
        <OrderSummary />
      </div>
    </div>
  );
}

export default PaymentInfo;
