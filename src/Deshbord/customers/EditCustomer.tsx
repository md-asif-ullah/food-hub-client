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
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/services/User";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {
  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id ?? "");
  const user = data?.payload || {};

  const { name, email, phone, isAdmin, isBanned } = user;

  const [selectRole, setSelectRole] = useState(isAdmin || false);
  const [selectStatus, setSelectStatus] = useState(isBanned || false);
  const [inputname, setInputname] = useState(name || "");
  const [inputemail, setInputemail] = useState(email || "");
  const [inputphone, setInputphone] = useState(phone || "");

  useEffect(() => {
    if (data) {
      setSelectRole(isAdmin);
      setSelectStatus(isBanned);
      setInputname(name);
      setInputemail(email);
      setInputphone(phone);
    }
  }, [name, email, phone, isAdmin, isBanned, data]);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Update user info
  const [updateUserInfo, { isLoading: updatingInfo }] =
    useUpdateUserInfoMutation();

  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();

  const handleUpdateUser = async () => {
    const newData = {
      name: inputname,
      email: inputemail,
      phone: inputphone,
      isAdmin: selectRole,
      isBanned: selectStatus,
    };
    try {
      const res = await updateUserInfo({
        id: user._id,
        body: newData,
      }).unwrap();

      if (res.success) {
        navigate("/deshbord/customers");
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser(user._id).unwrap();

      if (res.success) {
        navigate("/deshbord/customers");
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
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
        <div className="p-6 rounded-md shadow-md">
          <div className="mb-5">
            <Label className="block text-[#17172a] dark:text-white mb-2">
              Name
            </Label>
            <Input
              type="text"
              value={inputname}
              onChange={(e) => setInputname(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
            />
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Email
              </Label>
              <Input
                type="email"
                value={inputemail}
                onChange={(e) => setInputemail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
            <div className="mb-5">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Phone
              </Label>
              <Input
                type="number"
                value={inputphone}
                onChange={(e) => setInputphone(e.target.value)}
                placeholder="Phone"
                className="w-full p-2 border rounded focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="block text-[#17172a] dark:text-white mb-2">
                Role
              </Label>
              <Select
                value={selectRole ? "true" : "false"}
                onValueChange={(value) => setSelectRole(value === "true")}
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
                value={selectStatus ? "true" : "false"}
                onValueChange={(value) => setSelectStatus(value === "true")}
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
            <Button
              onClick={handleDeleteUser}
              className="bg-[#f58220] hover:bg-orange-700 duration-500 text-white"
            >
              {deletingUser ? <ProssingAnimation /> : "Delete Customer"}
            </Button>

            <Button
              onClick={handleUpdateUser}
              type="submit"
              className="text-white bg-[#f58220] hover:bg-orange-700 duration-500 my-3"
            >
              {updatingInfo ? <ProssingAnimation /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
