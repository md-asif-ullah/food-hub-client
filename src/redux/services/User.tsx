import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IResponse, IVerify, UserData } from "@/components/type";

type Post = {
  gender?: string;
  birthday?: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
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
      invalidatesTags: ["Post"],
    }),

    logOut: build.mutation<IResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),

    getUsers: build.query<IResponse, any>({
      query: ({ page, limit, search }) =>
        `/users?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ["Post"],
    }),

    getUser: build.query<IResponse, string | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useProcessRegisterMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useUpdateUserInfoMutation,
  useLogOutMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = userApi;
