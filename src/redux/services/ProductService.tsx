import { IResponse, products } from "@/components/type";
import { baseQueryApi } from "@/pages/hooks/baseQueryWithReauth";

export const productApi = baseQueryApi.injectEndpoints({
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
