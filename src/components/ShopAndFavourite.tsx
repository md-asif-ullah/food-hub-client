import { RootState } from "@/redux/Store";
import { useGetCartItemQuery } from "@/redux/services/CartService";
import { useGetFavouriteProductsQuery } from "@/redux/services/FavouriteService";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShopAndFavourite() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data: cartProduct } = useGetCartItemQuery(user?._id);
  const { data: favouriteProduct } = useGetFavouriteProductsQuery(
    user?._id || ""
  );

  return (
    <>
      <Link to="/cart">
        <div className="relative inline-flex items-center p-3 text-sm font-medium text-center">
          <div className="absolute inline-flex items-center justify-center md:w-6 md:h-6 w-5 h-5 text-xs font-bold text-white bg-[#f58220] rounded-full top-0 right-0 ">
            {cartProduct?.payload?.length || 0}
          </div>
          <IoCartOutline className="text-2xl dark:text-[#c2c7d0] text-black" />
        </div>
      </Link>
      <Link to="/favourite">
        <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white">
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#f58220] rounded-full top-0 right-0 ">
            {favouriteProduct?.payload?.length || 0}
          </div>
          <MdOutlineFavorite className="text-2xl text-red-500" />
        </div>
      </Link>
    </>
  );
}

export default ShopAndFavourite;
