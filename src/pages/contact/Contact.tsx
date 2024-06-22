import ContectInfo from "@/components/ContectInfo";
import img from "../../assets/images/contectImg/download.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddContectInfoMutation } from "@/redux/services/ContactService";
import ProssingAnimation from "@/components/ProssingAnimation";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

type FormInput = {
  name: string;
  email: string;
  message: string;
};

function ContectUs() {
  const [addContectInfo, { isLoading }] = useAddContectInfoMutation();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const res = await addContectInfo(data).unwrap();
      console.log(res);
      if (res.success) {
        toast.toast({
          title: "message send successfully",
          description: res.message,
        });
        reset();
      }
    } catch (error) {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-[#040717] h-full">
      <Helmet>
        <title>Contact | Best Online restaurant</title>
      </Helmet>
      <div className="h-full flex lg:justify-between bg-[#ffffff] dark:bg-[#040717] pb-24">
        <div className="pt-10 mb-5 md:mb-0 lg:ml-20 md:mx-auto mx-5">
          <div className="text-center mx-auto ">
            <div className="text-start max-w-md">
              <h3 className="text-4xl text-white font-medium">
                Contact Information
              </h3>
              <p className="text-[#717aa1] text-sm mt-4">
                Loremum et malesuada fames ac ante ipsum primis in faucibus. Sed
                molestie accumsan dui, non iaculis.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 mt-10">
              <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="dark:bg-[#040717] bg-white border text-black dark:text-white sm:text-sm rounded-lg block w-full p-2.5 outline-none focus:border-[#f58220] placeholder-gray-400"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                  minLength: 4,
                  maxLength: 30,
                })}
              />
              {errors.name && (
                <small className="text-red-500">
                  Name is required (min 4, max 30 characters)
                </small>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="dark:bg-[#040717] bg-white border text-black dark:text-white sm:text-sm rounded-lg block w-full p-2.5 outline-none focus:border-[#f58220] placeholder-gray-400"
                placeholder="Enter your email"
              />
              {errors.email && (
                <small className="text-red-500">Email is required</small>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
                Your Message
              </label>
              <textarea
                className="bg-white dark:bg-[#040717] border text-black dark:text-white sm:text-sm rounded-lg block w-full p-2.5 outline-none focus:border-[#f58220] placeholder-gray-400 pb-10"
                {...register("message", { required: true })}
                name="message"
                required
                placeholder="Enter your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-white mt-5 bg-[#f58220] hover:bg-orange-700 primary_button"
            >
              {isLoading ? <ProssingAnimation /> : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-[40%]  hidden lg:block">
          <img src={img} alt="" />
        </div>
      </div>
      <ContectInfo />
    </div>
  );
}

export default ContectUs;
