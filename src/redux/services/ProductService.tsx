import { products } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<products, string>({
      query: (query) => `/api/products?${query}`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
