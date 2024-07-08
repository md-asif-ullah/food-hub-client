import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import authBg from "@/assets/images/authImg/auth-bg-WWHEDCJO.png";
import SocialLogin from "@/components/SocialLogin";
import { useProcessRegisterMutation } from "@/redux/services/User";
import { useToast } from "@/components/ui/use-toast";
import ProssingAnimation from "@/components/ProssingAnimation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Register() {
  interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [processRegister, { isLoading }] = useProcessRegisterMutation();

  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await processRegister({ name, email, password }).unwrap();

      if (res.success) {
        toast({
          title: "verification code sent successfully",
          description: res.message,
        });
        navigate(`/verify-email/${email}`);
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
    <div className="grid lg:grid-cols-2 gap-40 dark:bg-[#2e1d19] bg-[#fdf2e8] min-h-screen pb-20">
      <div className="lg:pl-20 pt-10 mx-5 sm:mx-40 lg:mx-0">
        <div className="text-center mx-auto">
          <div className="text-start">
            <h3 className="text-4xl dark:text-white text-black font-medium">
              Register
            </h3>
            <p className="text-[#717aa1] text-sm mt-4">
              Don't have an account? Create your account, it takes less than a
              minute at Yum
            </p>
          </div>
        </div>

        <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <Label className="Lable_style">Name</Label>
            <Input
              type="text"
              className="Input_style"
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
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
              })}
              className="Input_style"
              placeholder="Enter your password"
            />
            {errors.password && (
              <small className="text-red-500">
                Password must be 8-30 characters, including 1 uppercase, 1
                lowercase, 1 number, and 1 special character
              </small>
            )}
          </div>
          <div className="mb-5">
            <Label className="Lable_style">Confirm Password</Label>
            <Input
              type={checkbox ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              className="Input_style"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <small className="text-red-500">
                Please confirm your password
              </small>
            )}
            <small className="text-red-600">{error}</small>
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
            {isLoading ? <ProssingAnimation /> : "Register"}
          </Button>
        </form>

        <p className="dark:text-white text-black mt-2 text-sm">
          Already have an account?
          <Link className="text-[#f58220] ml-2" to="/login">
            Login
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

export default Register;
