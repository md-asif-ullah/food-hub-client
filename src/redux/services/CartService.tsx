import {
  IAddToCartType,
  ICartProduct,
  IResponse,
  IUpdatequantity,
} from "@/components/type";

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation<IResponse, IAddToCartType>({
      query: (product) => ({
        url: "/cartProducts",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["cart"],
    }),
    getCartItem: builder.query<ICartProduct, string | undefined>({
      query: (id) => `/cartProducts/${id}`,
      providesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/cartProducts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    UpdateQuantity: builder.mutation<IResponse, IUpdatequantity>({
      query: ({ _id, quantity }) => ({
        url: `/cartProducts/updateQuantity/${_id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartItemQuery,
  useDeleteCartItemMutation,
  useUpdateQuantityMutation,
} = cartApi;
