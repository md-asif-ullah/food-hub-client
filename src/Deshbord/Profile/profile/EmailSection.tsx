import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerifyOtp from "@/components/VarifyOtp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useState } from "react";

function EmailSection() {
  const [showEmailVerifyOtp, setShowEmailVerifyOtp] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const { email } = user || {};

  // TODO: Implement handleUpdateEmail

  const handleUpdateEmail: React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dark:bg-gray-800 bg-[#fef2e8] p-4 md:p-6 rounded-lg shadow-md">
      <div onSubmit={handleUpdateEmail} className="space-y-6">
        <div className="md:flex justify-between items-center">
          <h3 className="md:text-4xl text-2xl dark:text-white text-slate-700 font-medium">
            Email Address
          </h3>
          <p
            onClick={() => setShowEmail(!showEmail)}
            className="text-[#717aa1] text-sm mt-4 cursor-pointer"
          >
            change email address
          </p>
        </div>
        <Input
          type="email"
          disabled={showEmail}
          defaultValue={email}
          className="w-full px-3 py-2 border rounded focus:border-orange-600"
        />
        {showEmail ? (
          ""
        ) : (
          <div>
            {showEmailVerifyOtp ? (
              <div>
                <VerifyOtp buttonText="veryfy Email" />
              </div>
            ) : (
              <Button
                onClick={() => setShowEmailVerifyOtp(true)}
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

export default EmailSection;
