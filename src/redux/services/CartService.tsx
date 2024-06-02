import { IProduct, IResponse } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation<IResponse, IProduct>({
      query: (product) => ({
        url: "/api/addtocart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
