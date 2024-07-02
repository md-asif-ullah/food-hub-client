import { useNavigate, useParams } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useVerifyUserMutation } from "@/redux/services/User";
import ProssingAnimation from "@/components/ProssingAnimation";
import { useState } from "react";

function Verify() {
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const [value, setValue] = useState("");

  const { email } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await verifyUser({
        email: email ?? "",
        verificationCode: value,
      }).unwrap();

      if (res.success) {
        setValue("");
        toast({
          title: "Account verified successfully",
          description: "please login to your account.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      setValue("");
      if (error.data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.data.message,
        });
      }
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-[#020817] flex justify-center items-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify your account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We have sent you a verification code to your email address.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white mt-5 bg-[#f58220] hover:bg-orange-700 primary_button"
          >
            {isLoading ? <ProssingAnimation /> : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify;
