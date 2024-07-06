import { reviews } from "@/components/type";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

export const reviewsApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query<reviews, void>({
      query: () => "/reviews",
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
