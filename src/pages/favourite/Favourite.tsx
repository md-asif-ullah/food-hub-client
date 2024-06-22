import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/Store";
import {
  useDeleteFavouriteProductMutation,
  useGetFavouriteProductsQuery,
} from "@/redux/services/FavouriteService";
import { Helmet } from "react-helmet-async";
import { MdOutlineFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Favourite() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data: favouriteProduct } = useGetFavouriteProductsQuery(
    user?._id || ""
  );

  const [deleteFavouriteProduct] = useDeleteFavouriteProductMutation();

  const { toast } = useToast();

  const handleRemoveFavouriteProduct = async (_id: string) => {
    try {
      const res = await deleteFavouriteProduct(_id).unwrap();
      if (res.success) {
        toast({
          title: "Success",
          description: res.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#020617] bg-white pt-28 xl:px-14 px-5">
      <Helmet>
        <title>favourite | Best Online restaurant</title>
      </Helmet>
      {favouriteProduct?.payload?.length === 0 && (
        <div className="text-center text-2xl font-bold dark:text-white text-black">
          Not found any favourite product
        </div>
      )}
      {favouriteProduct?.payload?.map((product: any) => {
        const { _id, product_id, name, image, price } = product;
        return (
          <div
            key={_id}
            className="border dark:border-[#1e293b] border-[#e2e8f0] text-white flex flex-col sm:flex-row justify-between items-center rounded-lg p-4 sm:p-8 mb-4"
          >
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <img
                src={image}
                alt={name}
                className="sm:w-20 w-full sm:h-20 h-32 object-cover sm:mr-4 rounded-lg"
              />
              <div className="hidden sm:block">
                <h2 className="text-lg font-bold dark:text-white text-black">
                  {name}
                </h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto mb-4 sm:mb-0">
              <div className="sm:hidden mb-2">
                <h2 className="text-lg font-bold dark:text-white text-black">
                  {name}
                </h2>
              </div>
              <div className="text-2xl font-bold text-[#64748b] sm:ml-4">
                ${price}
              </div>
            </div>
            <div className="flex sm:flex-col w-full sm:w-auto ">
              <button
                onClick={() => handleRemoveFavouriteProduct(_id)}
                className="mr-4 mb-4 sm:mb-0 text-right"
              >
                <MdOutlineFavorite className="hover_effect mt-3 sm:mt-0 text-3xl text-red-600 sm:ml-14" />
              </button>
              <Link to={`/product/${product_id}`} className="w-full sm:mt-2">
                <Button className="bg-[#f58220] w-full sm:w-auto hover:bg-orange-700 duration-500 dark:text-white">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Favourite;
