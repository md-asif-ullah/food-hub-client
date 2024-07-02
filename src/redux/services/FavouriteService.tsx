import { Favourite, IResponse } from "@/components/type";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

const favouriteApi = createApi({
  reducerPath: "favouriteApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Favourite"],
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
