import { ICartProduct, IResponse } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation<IResponse, ICartProduct>({
      query: (product) => ({
        url: "/cartProducts",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["cart"],
    }),
    getCartItem: builder.query<ICartProduct, void>({
      query: () => "/cartProducts",
      providesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/cartProducts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartItemQuery,
  useDeleteCartItemMutation,
} = cartApi;
