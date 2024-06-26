import { Favourite, IResponse } from "@/components/type";
import { baseQueryApi } from "@/pages/hooks/baseQueryWithReauth";

const favouriteApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavouriteProduct: builder.mutation<IResponse, Partial<Favourite>>({
      query: (body) => ({
        url: "/favourite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favourite"],
    }),
    getFavouriteProducts: builder.query<IResponse, string>({
      query: (id) => `/favourite/${id}`,
      providesTags: ["Favourite"],
    }),
    deleteFavouriteProduct: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/favourite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favourite"],
    }),
  }),
});

export const {
  useAddFavouriteProductMutation,
  useGetFavouriteProductsQuery,
  useDeleteFavouriteProductMutation,
} = favouriteApi;
export default favouriteApi;
