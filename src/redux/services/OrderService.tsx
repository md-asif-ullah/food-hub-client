import { IOrder, IResponse } from "@/components/type";
import { cartApi } from "./CartService";
import { baseQueryApi } from "@/pages/hooks/baseQueryWithReauth";

export const orderApi = baseQueryApi.injectEndpoints({
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
