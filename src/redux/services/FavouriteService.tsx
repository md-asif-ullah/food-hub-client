import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Favourite, IResponse } from "@/components/type";

const favouriteApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Favourite"],
  endpoints: (build) => ({
    addFavouriteProduct: build.mutation<IResponse, Partial<Favourite>>({
      query: (body) => ({
        url: "/favourite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favourite"],
    }),
    getFavouriteProducts: build.query<IResponse, string>({
      query: (id) => `/favourite/${id}`,
      providesTags: ["Favourite"],
    }),
    deleteFavouriteProduct: build.mutation<IResponse, string>({
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
