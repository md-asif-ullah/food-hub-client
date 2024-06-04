import { reviews } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query<reviews, void>({
      query: () => "/reviews",
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
