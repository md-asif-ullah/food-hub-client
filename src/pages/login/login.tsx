import { Link, useNavigate } from "react-router-dom";
import authBg from "@/assets/images/authImg/auth-bg-WWHEDCJO.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import SocialLogin from "@/components/SocialLogin";
import { ILogin } from "@/components/type";
import { useLoginUserMutation } from "@/redux/services/User";
import ProssingAnimation from "@/components/ProssingAnimation";
import { setUser } from "@/redux/user/UserSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(setUser(res.payload));

      if (res.success) {
        navigate("/");
        toast({
          title: "sign in successfully",
          description: "You can now login to your account.",
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
    <div className="grid lg:grid-cols-2  gap-40 dark:bg-[#2e1d19] bg-[#fdf2e8] h-full pb-20">
      <div className="lg:pl-20 pt-10 mx-5 sm:mx-40 lg:mx-0">
        <div className="text-center mx-auto">
          <div className="text-start">
            <h3 className="text-4xl dark:text-white text-black font-medium">
              Login
            </h3>
            <p className="text-[#717aa1] text-sm mt-4">wellcome back to Yum</p>
          </div>
        </div>

        <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium dark:text-gray-300 text-black">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="bg-white dark:bg-[#040717] border text-black dark:text-white sm:text-sm rounded-lg block w-full p-2.5 outline-none focus:border-[#f58220] placeholder-gray-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <small className="text-red-500">Email is required</small>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium dark:text-gray-300 text-black">
              Password
            </label>
            <input
              type={checkbox ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
              className="bg-white dark:bg-[#040717] border  text-black dark:text-white sm:text-sm rounded-lg block w-full p-2.5 outline-none focus:border-[#f58220] placeholder-gray-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <small className="text-red-500">password is required</small>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-sm accent-orange-500"
              onChange={() => setCheckbox(!checkbox)}
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="text-white mt-5 bg-[#f58220] hover:bg-orange-700 primary_button"
          >
            {isLoading ? <ProssingAnimation /> : "Login"}
          </button>
        </form>

        <p className="dark:text-white text-black mt-2 text-sm">
          Don't have an account?
          <Link className="text-[#f58220] ml-2" to="/register">
            Register
          </Link>
        </p>

        <SocialLogin />
      </div>
      <div className=" hidden lg:block">
        <img src={authBg} alt="Authentication Background" />
      </div>
    </div>
  );
}

export default Login;
