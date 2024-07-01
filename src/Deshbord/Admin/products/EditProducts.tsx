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

function EditProducts() {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: productLoading } = useGetProductQuery(id!);

  const { name, price, description, quantity, discount, image, category, _id } =
    data?.payload || {};

  const { toast } = useToast();
  const navigate = useNavigate();

  const [localImage, setLocalImage] = useState<FileList | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputPrice, setInputPrice] = useState<number>(0);
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const [inputDiscount, setInputDiscount] = useState<number>(0);

  useEffect(() => {
    if (localImage && localImage.length > 0) {
      setInputImage(URL.createObjectURL(localImage[0]));
    }
  }, [localImage]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(
      selectCategory,
      inputName,
      inputPrice,
      inputDescription,
      inputQuantity,
      inputDiscount,
      localImage
    );
    const formData = new FormData();
    formData.append("name", inputName || "");
    formData.append("category", selectCategory || "");
    formData.append("price", inputPrice.toString() || "");
    formData.append("description", inputDescription || "");
    formData.append("quantity", inputQuantity.toString() || "");
    formData.append("discount", inputDiscount.toString() || "");
    if (localImage && localImage.length > 0) {
      formData.append("image", localImage[0]);
    }

    try {
      const res = await updateProduct({ formData, id: _id }).unwrap();
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
        onSubmit={handleSubmit}
      >
        {/* Image Upload */}
        <div className="mx-auto">
          <div>
            <div className="border border-[#1e293b] p-3 w-[315px] h-[315px] rounded-lg">
              <label htmlFor="input-image" className="block">
                <div className="sm:w-72 h-72 border-2 border-[#f58220] border-dotted rounded-xl flex items-center justify-center">
                  {inputImage ? (
                    <div className="relative w-full h-full">
                      <img
                        className="w-full h-full pb-10 object-cover rounded-xl"
                        src={inputImage}
                        alt="Preview"
                      />
                      <i
                        className="absolute bottom-3 left-1/2 cursor-pointer"
                        onClick={() => setInputImage("")}
                      >
                        <ImCross className="text-white" />
                      </i>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        className="w-full h-full pb-10 object-cover rounded-xl"
                        src={image}
                        alt="Preview"
                      />
                      <i
                        className="absolute bottom-3 left-1/2 cursor-pointer"
                        onClick={() => setInputImage("")}
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
                  onChange={(e) => {
                    setLocalImage(e.target.files);
                  }}
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
              defaultValue={name}
              onChange={(e) => setInputName(e.target.value)}
              className="focus:border-[#f58220] mt-2 text-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Category</Label>
              <Select
                defaultValue={category}
                onValueChange={(value) => setSelectCategory(value)}
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
                defaultValue={quantity}
                onChange={(e) => setInputQuantity(Number(e.target.value))}
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
                defaultValue={price}
                onChange={(e) => setInputPrice(Number(e.target.value))}
                placeholder="Price"
                className="focus:border-[#f58220] mt-2 text-black dark:text-white"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Label className="text-[#17172a] dark:text-white">Discount</Label>
              <Input
                type="number"
                defaultValue={discount}
                onChange={(e) => setInputDiscount(Number(e.target.value))}
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
              defaultValue={description}
              onChange={(e) => setInputDescription(e.target.value)}
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
