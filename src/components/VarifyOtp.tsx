import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import ProssingAnimation from "./ProssingAnimation";
import { Button } from "./ui/button";

interface VerifyOtpProps {
  buttonText?: string;
}

function VerifyOtp({ buttonText }: VerifyOtpProps) {
  const [value, setValue] = useState("");

  const isLoading = false;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className="text-sm">Enter your OTP</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="border border-white bg-[#020817]"
            />
            <InputOTPSlot
              index={1}
              className="border border-white bg-[#020817]"
            />
            <InputOTPSlot
              index={2}
              className="border border-white bg-[#020817]"
            />
            <InputOTPSlot
              index={3}
              className="border border-white bg-[#020817]"
            />
            <InputOTPSlot
              index={4}
              className="border border-white bg-[#020817]"
            />
            <InputOTPSlot
              index={5}
              className="border border-white bg-[#020817]"
            />
          </InputOTPGroup>
        </InputOTP>
        <Button
          type="submit"
          disabled={isLoading}
          className=" text-white mt-5 bg-[#f58220] hover:bg-orange-700"
        >
          {isLoading ? <ProssingAnimation /> : buttonText}
        </Button>
      </form>
    </div>
  );
}

export default VerifyOtp;
