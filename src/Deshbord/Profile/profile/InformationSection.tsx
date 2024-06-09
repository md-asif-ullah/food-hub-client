import { SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
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

interface IFormInfoInput {
  name: string;
  gender: string;
}

function InformationSection() {
  const [updateUserInfo, { data, isLoading }] = useUpdateUserInfoMutation();

  const user = useSelector((state: RootState) => state.user.currentUser);
  const { name, gender, birthday, _id } = user || {};

  const [date, setDate] = useState<Date>();
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const { register, handleSubmit } = useForm<IFormInfoInput>();
  const onSubmit: SubmitHandler<IFormInfoInput> = (info) => {
    const day = date?.getDate();
    const month = date?.getMonth();
    const year = date?.getFullYear();
    const newInfo = { ...info, birthday: `${day}/${month}/${year}` };
    console.log(newInfo);

    updateUserInfo({ id: _id, body: newInfo });
  };

  console.log(data, isLoading);

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
          <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
            Name
          </label>
          <Input
            type="text"
            {...register("name")}
            disabled={showInfo}
            defaultValue={name}
            className="w-full px-3 py-2 rounded focus:border-orange-600"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
            Date of Birth
          </label>
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
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                defaultMonth={birthday ? new Date(birthday) : new Date()}
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">
            Gender
          </label>
          <RadioGroup
            {...register("gender")}
            defaultChecked={!gender}
            className="flex space-x-5"
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
        Save Changes
      </Button>
    </form>
  );
}

export default InformationSection;