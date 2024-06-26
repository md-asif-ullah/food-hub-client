import LoadingAnimation from "@/components/LoadingAnimation";
import ProssingAnimation from "@/components/ProssingAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/services/User";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
}

function EditCustomer() {
  const [role, setRole] = useState<boolean>();
  const [status, setStatus] = useState<boolean>();

  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id ?? "");
  const user = data?.payload || {};

  const { toast } = useToast();

  const [updateUserInfo, { isLoading: updatingInfo }] =
    useUpdateUserInfoMutation();

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newData = {
      ...data,
      isAdmin: role,
      isBanned: status,
    };
    console.log(newData);
    try {
      const res = await updateUserInfo({ id: user._id, body: newData });

      if (res.data) {
        toast({
          title: "Product Added",
          description: "user updated successfully",
        });
      }
    } catch (error: any) {
      console.log(error.data);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.data.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#020817] min-h-[85vh]">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl ml-4 sm:ml-6 md:ml-10">
        Edit Customer
      </h1>
      {isLoading && <LoadingAnimation />}
      <div className="border dark:border-[#1e293b] border-[#e2e8f0] md:m-10 m-5 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded-md shadow-md"
        >
          <div className="mb-5">
            <Label className="block text-[#17172a] dark:text-white mb-2">
              Name
            </Label>
            <Input
              type="text"
              defaultValue={user.name}
              placeholder="Product name"
              className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
              {...register("name")}
            />
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Email
              </Label>
              <Input
                type="email"
                defaultValue={user.email}
                placeholder="Email"
                className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("email")}
              />
            </div>
            <div className="mb-5">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Phone
              </Label>
              <Input
                type="number"
                defaultValue={user.phone}
                placeholder="Phone"
                className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Role
              </Label>
              <Select
                value={user?.isAdmin ? "true" : "false"}
                onValueChange={(value) => setRole(value === "true")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Customer</SelectItem>
                  <SelectItem value="true">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Status
              </Label>
              <Select
                value={user?.isBanned ? "true" : "false"}
                onValueChange={(value) => setStatus(value === "true")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Active</SelectItem>
                  <SelectItem value="true">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-right sm:space-x-5 flex flex-col sm:block">
            <Button className="bg-[#f58220] hover:bg-orange-700 duration-500 text-white">
              {isLoading ? <ProssingAnimation /> : "Delete Customer"}
            </Button>

            <Button
              type="submit"
              className="text-white bg-[#f58220] hover:bg-orange-700 duration-500 my-3"
            >
              {updatingInfo ? <ProssingAnimation /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
