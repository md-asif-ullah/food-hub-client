import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/components/ApiResponse";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Enter your verification code to continue.",
  }),
});

function Verify() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const { email } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post("/api/users/vefity", {
        email,
        verificationCode: data.pin,
      });
      if (res.data.success) {
        navigate("/");
        toast({
          title: "Account verified successfully",
          description: "You can now register to your account.",
        });
      }
    } catch (error) {
      const exiosError = error as AxiosError<ApiResponse>;
      if (exiosError.response) {
        toast({
          title:
            exiosError.response.data.message ||
            "An error occurred. Please try again later.",
          description: "Please try again later.",
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
        });
      }
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-[#020817] flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter verify code</FormLabel>
                <FormDescription>
                  We have sent a 6 digit verification code to your email
                  address.
                </FormDescription>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-orange-500 text-white hover:bg-orange-700 duration-500"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Verify;
