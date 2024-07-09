import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/services/ProductService";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useToast } from "@/components/ui/use-toast";
import ProssingAnimation from "@/components/ProssingAnimation";
import { useForm } from "react-hook-form";

interface FormType {
  name: string;
  category: string;
  price: number;
  description: string;
  image: FileList;
  quantity: number;
  discount: number;
}

function EditProducts() {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: productLoading } = useGetProductQuery(id!);

  const { toast } = useToast();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [category, setCategory] = useState<string>("");

  const { register, handleSubmit, watch, setValue } = useForm<FormType>({
    defaultValues: {
      name: data?.payload.name,
      category: data?.payload.category,
      price: data?.payload.price,
      description: data?.payload.description,
      quantity: data?.payload.quantity,
      discount: data?.payload.discount,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.payload.name);
      setValue("category", data.payload.category);
      setValue("price", data.payload.price);
      setValue("description", data.payload.description);
      setValue("quantity", data.payload.quantity);
      setValue("discount", data.payload.discount);
      setCategory(data.payload.category);
    }
  }, [data, setValue]);

  // get image from user
  const pic = watch("image");
  useEffect(() => {
    if (pic && pic.length > 0) {
      setImage(URL.createObjectURL(pic[0]));
    }
  }, [pic]);

  const onSubmit = async (data: FormType) => {
    const { name, price, description, image, discount, quantity } = data;

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("category", category || "");
    formData.append("price", price.toString() || "");
    formData.append("description", description || "");
    formData.append("quantity", quantity.toString() || "");
    formData.append("discount", discount.toString() || "");
    if (image && image.length > 0) {
      formData.append("image", image[0]);
    }

    try {
      const res = await updateProduct({ formData, id: id! }).unwrap();
      if (res.success) {
        navigate("/deshbord/dishes-list");
        toast({
          title: "Product Updated",
          description: "Product has been updated successfully",
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
        <title>Edit Product | Best Online Restaurant</title>
      </Helmet>
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl ml-4 sm:ml-6 md:ml-10">
        Edit Product
      </h1>
      {productLoading && <LoadingAnimation />}
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
                    <div className="relative w-full h-full">
                      <img
                        className="w-full h-full pb-10 object-cover rounded-xl"
                        src={data?.payload.image}
                        alt="Preview"
                      />
                      <i
                        className="absolute bottom-3 left-1/2 cursor-pointer"
                        onClick={() => setImage("")}
                      >
                        <ImCross className="text-white" />
                      </i>
                    </div>
                  )}
                </div>
                <input
                  className="hidden"
                  type="file"
                  id="input-image"
                  accept="image/*"
                  {...register("image")}
                />
              </label>
            </div>
            <p className="dark:text-white text-center mt-2">
              (PNG/JPG/JPEG, Max. 3MB)
            </p>
          </div>
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
              {...register("name")}
              className="focus:border-[#f58220] mt-2 text-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full border focus:border-[#f58220] mt-2 text-[#6e798e]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Burger">Burger</SelectItem>
                  <SelectItem value="Noodles">Noodles</SelectItem>
                  <SelectItem value="Pizza">Pizza</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-5">
              <Label className="text-[#17172a] dark:text-white">Quantity</Label>
              <Input
                type="number"
                {...register("quantity")}
                placeholder="Quantity"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Price</Label>
              <Input
                type="number"
                {...register("price")}
                placeholder="Price"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Discount</Label>
              <Input
                type="number"
                {...register("discount")}
                placeholder="Discount"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label className="text-[#17172a] dark:text-white">
              Description
            </Label>
            <Textarea
              className="textarea_style"
              {...register("description")}
              placeholder="Type your message here."
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-[#f58220] hover:bg-orange-700 duration-500"
          >
            {isLoading ? <ProssingAnimation /> : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProducts;
