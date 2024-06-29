import { SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdateUserInfoMutation } from "@/redux/services/User";
import { useToast } from "@/components/ui/use-toast";
import { setUser } from "@/redux/user/UserSlice";
import ProssingAnimation from "@/components/ProssingAnimation";

interface IFormInfoInput {
  name: string;
  gender: string;
}

function InformationSection() {
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const { toast } = useToast();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.currentUser);
  const { name, gender, birthday, _id } = user || {};

  const [date, setDate] = useState<Date>();
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const { register, handleSubmit } = useForm<IFormInfoInput>();
  const onSubmit: SubmitHandler<IFormInfoInput> = async (info) => {
    const day = date?.getDate();
    const month = date?.getMonth();
    const year = date?.getFullYear();
    const newInfo = { ...info, birthday: `${day}/${month}/${year}` };

    try {
      const res = await updateUserInfo({ id: _id, body: newInfo }).unwrap();
      dispatch(setUser(res.payload));

      if (res.success) {
        setShowInfo(true);
        toast({
          description: "Your information has been updated.",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#fef2e8] dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md space-y-6"
    >
      <div className="md:flex justify-between items-center">
        <h3 className="md:text-4xl text-2xl dark:text-white text-slate-700  font-medium">
          Personal Information
        </h3>
        <p
          onClick={() => setShowInfo(!showInfo)}
          className="text-[#717aa1] text-sm mt-4 cursor-pointer"
        >
          change information
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="Lable_style">Name</Label>
          <Input
            type="text"
            {...register("name")}
            disabled={showInfo}
            defaultValue={name}
            className="Input_style"
          />
        </div>
        <div className="space-y-2">
          <Label className="Lable_style">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={showInfo}
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>
                    {birthday === "undefined/undefined/undefined"
                      ? "Pick a date"
                      : birthday}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="Lable_style">Gender</Label>
          <RadioGroup
            {...register("gender")}
            defaultValue={gender}
            className="flex space-x-5 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem disabled={showInfo} value="Male" id="r1" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem disabled={showInfo} value="Female" id="r2" />
              <Label htmlFor="r2">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <Button disabled={showInfo} className="bg-[#f58220] hover:bg-orange-700">
        {isLoading ? <ProssingAnimation /> : "Save Changes"}
      </Button>
    </form>
  );
}

export default InformationSection;
