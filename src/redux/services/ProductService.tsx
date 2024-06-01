import { products } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<products, string>({
      query: (query) => `/api/products?${query}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query<products, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: ["Products"],
    }),
    getPopularProducts: builder.query<products, void>({
      query: () => "/api/products/popular",
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetPopularProductsQuery,
} = productApi;
