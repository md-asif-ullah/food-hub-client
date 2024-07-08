import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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
        navigate(from, { replace: true });
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
            <Label className="Lable_style">Email</Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              className="Input_style"
              placeholder="Enter your email"
            />
            {errors.email && (
              <small className="text-red-500">Email is required</small>
            )}
          </div>
          <div className="mb-5">
            <Label className="Lable_style">Password</Label>
            <Input
              type={checkbox ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
              className="Input_style"
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

          <Button
            type="submit"
            disabled={isLoading}
            className="Button_style hover:bg-orange-700 w-full"
          >
            {isLoading ? <ProssingAnimation /> : "Login"}
          </Button>
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
