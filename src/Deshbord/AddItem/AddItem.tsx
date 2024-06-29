import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProductMutation } from "@/redux/services/ProductService";
import { useToast } from "@/components/ui/use-toast";
import ProssingAnimation from "@/components/ProssingAnimation";
import { Helmet } from "react-helmet-async";

interface FormType {
  name: string;
  category: string;
  price: number;
  description: string;
  image: FileList;
  quantity: number;
  discount: number;
}

function AddItem() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [image, setImage] = useState("");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();

  // get image from user

  const pic = watch("image");
  useEffect(() => {
    if (pic && pic.length > 0) {
      setImage(URL.createObjectURL(pic[0]));
    }
  }, [pic]);

  const onSubmit = async (data: FormType) => {
    const { name, price, description, image, discount, quantity } = data;

    if (!category) {
      setError("This field is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("discount", discount.toString());
    formData.append("quantity", quantity.toString());
    formData.append("image", image[0]);

    try {
      const res = await createProduct(formData).unwrap();
      if (res.success) {
        toast({
          title: "Product Added",
          description: "Product has been added successfully",
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
    <div className="text-white min-h-[80vh] pb-20">
      <Helmet>
        <title> Add Dish | Best Online restaurant</title>
      </Helmet>
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl ml-4 sm:ml-6 md:ml-10">
        Add Dish
      </h1>

      <form
        className="grid xl:grid-cols-3 sm:px-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Upload */}
        <div className="mx-auto">
          <div>
            <div className="border border-[#1e293b] p-3 w-[315px] h-[315px] rounded-lg">
              <label htmlFor="input-image" className="block">
                <div className="sm:w-72 h-72 border-2 border-[#f58220] border-dotted rounded-xl flex items-center justify-center">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        className="w-full h-full pb-10 object-cover rounded-xl"
                        src={image}
                        alt="Preview"
                      />
                      <i
                        className="absolute bottom-3 left-1/2 cursor-pointer"
                        onClick={() => setImage("")}
                      >
                        <ImCross className="text-white" />
                      </i>
                    </div>
                  ) : (
                    <p className="text-[#f58220]">Upload Image</p>
                  )}
                </div>
                <input
                  className="hidden"
                  type="file"
                  id="input-image"
                  accept="image/*"
                  {...register("image", { required: true })}
                />
              </label>
            </div>
            <p className="dark:text-white text-center mt-2">
              (PNG/JPG/JPEG, Max. 3MB)
            </p>
          </div>
          {errors.image && (
            <span className="text-sm text-red-700">This field is required</span>
          )}
        </div>

        {/* Product Details */}
        <div className="xl:col-span-2 mt-14 xl:mt-0 mx-4 sm:mx-0">
          <div className="mb-5">
            <Label className="text-[#17172a] dark:text-white">
              Product Name
            </Label>
            <Input
              type="text"
              placeholder="Product name"
              className=" focus:border-[#f58220] mt-2 text-black dark:text-white"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-700">
                This field is required
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Category</Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full border focus:border-[#f58220] mt-2 text-[#6e798e]">
                  <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Burger">Burger</SelectItem>
                  <SelectItem value="Noodles">Noodles</SelectItem>
                  <SelectItem value="Pizza">Pizza</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
              {error && <span className="text-sm text-red-700">{error}</span>}
            </div>
            <div className="mb-5">
              <Label className="text-[#17172a] dark:text-white">Quantity</Label>
              <Input
                type="number"
                placeholder="Quantity"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Price</Label>
              <Input
                type="number"
                step="any"
                placeholder="Price"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-sm text-red-700">
                  This field is required
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Discount</Label>
              <Input
                type="number"
                step="any"
                placeholder="discount"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
                {...register("discount")}
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label className="text-[#17172a] dark:text-white">
              Description
            </Label>
            <Textarea
              className="textarea_style"
              {...register("description", { required: true })}
              placeholder="Type your message here."
            />
            {errors.description && (
              <span className="text-sm text-red-700">
                This field is required
              </span>
            )}
          </div>

          <Button className="w-full text-white bg-[#f58220] hover:bg-orange-700 duration-500">
            {isLoading ? <ProssingAnimation /> : " Add Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
