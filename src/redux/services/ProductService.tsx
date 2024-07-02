import {
  IResponse,
  ProductsResponse,
  getproductResponse,
} from "@/components/type";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, string>({
      query: (query) => `/products?${query}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query<getproductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    getPopularProducts: builder.query<ProductsResponse, void>({
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

    getProductsForAdmin: builder.query<ProductsResponse, { search: string }>({
      query: ({ search }) => `/products/admin?search=${search}`,
      providesTags: ["Products"],
    }),

    updateProduct: builder.mutation<IResponse, Partial<any>>({
      query: ({ id, formData }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
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
  useGetProductsForAdminQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
