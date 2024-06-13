import { IResponse, products } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<products, string>({
      query: (query) => `/products?${query}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query<products, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    getPopularProducts: builder.query<products, void>({
      query: () => "/products/popular",
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<IResponse, Partial<any>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetPopularProductsQuery,
  useCreateProductMutation,
} = productApi;
