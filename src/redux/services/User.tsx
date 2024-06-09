import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IResponse, IVerify, UserData } from "@/components/type";

type Post = {
  gender: string;
  birthday: string;
  name: string;
};

interface PartialType {
  id: string | undefined;
  body: Post;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    processRegister: build.mutation<IResponse, Omit<UserData, "id">>({
      query: (body) => ({
        url: "/users/process-register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    verifyUser: build.mutation<IResponse, Omit<IVerify, "id">>({
      query: (body) => ({
        url: "/users/vefity",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    loginUser: build.mutation<IResponse, Omit<ILogin, "id">>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),

    updateUserInfo: build.mutation<
      IResponse,
      Partial<PartialType> & Pick<PartialType, "id">
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useProcessRegisterMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useUpdateUserInfoMutation,
} = userApi;
