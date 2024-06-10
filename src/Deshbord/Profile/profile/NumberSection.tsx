import VerifyOtp from "@/components/VarifyOtp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/Store";
import { useState } from "react";
import { useSelector } from "react-redux";

function NumberSection() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { phone } = user || {};

  const [showMobile, setShowMobile] = useState<boolean>(true);
  const [showMobileVerifyOtp, setShowMobileVerifyOtp] =
    useState<boolean>(false);

  // TODO: Implement handleMobileNumber
  const handleMobileNumber: React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dark:bg-gray-800 bg-[#fef2e8] p-4 md:p-6 rounded-lg shadow-md">
      <div onSubmit={handleMobileNumber} className="space-y-6">
        <div className="md:flex justify-between items-center">
          <h3 className="md:text-4xl text-2xl dark:text-white text-slate-700 font-medium">
            Mobile Number
          </h3>
          <p
            onClick={() => setShowMobile(!showMobile)}
            className="text-[#717aa1] text-sm mt-4 cursor-pointer"
          >
            change mobile number
          </p>
        </div>

        <Input
          disabled={showMobile}
          type="number"
          defaultValue={phone}
          className="w-full px-3 py-2 border rounded focus:border-orange-600"
        />
        {showMobile ? (
          ""
        ) : (
          <div>
            {showMobileVerifyOtp ? (
              <div>
                <VerifyOtp buttonText="veryfy Number" />
              </div>
            ) : (
              <Button
                onClick={() => setShowMobileVerifyOtp(true)}
                className="bg-[#f58220] hover:bg-orange-700"
              >
                Send OTP
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberSection;
