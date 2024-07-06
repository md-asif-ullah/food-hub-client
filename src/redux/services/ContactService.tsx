import { IContact, IResponse } from "@/components/type";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addContectInfo: builder.mutation<IResponse, Partial<IContact>>({
      query(body) {
        return {
          url: "/contact",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAddContectInfoMutation } = contactApi;
