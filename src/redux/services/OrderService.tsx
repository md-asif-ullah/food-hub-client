import { IOrder, IResponse } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartApi } from "./CartService";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    addOrder: builder.mutation<IResponse, Partial<IOrder>>({
      query: (product) => ({
        url: "/order",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["order"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(cartApi.util.invalidateTags(["cart"]));
      },
    }),
  }),
});

export const { useAddOrderMutation } = orderApi;
