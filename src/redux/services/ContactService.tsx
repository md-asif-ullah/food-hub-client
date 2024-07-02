import { IContact, IResponse } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    addContectInfo: builder.mutation<IResponse, Partial<IContact>>({
      query(body) {
        return {
          url: "/api/contact",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAddContectInfoMutation } = contactApi;
