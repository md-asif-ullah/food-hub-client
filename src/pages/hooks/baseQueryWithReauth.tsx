import { clearUser } from "@/redux/user/UserSlice";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh token failed, log out the user
      await baseQuery(
        { url: "/auth/logout", method: "POST" },
        api,
        extraOptions
      );
      api.dispatch(clearUser());
    }
  }

  return result;
};

// Define the baseQueryApi using createApi
export const baseQueryApi = createApi({
  reducerPath: "baseQueryApi",
  tagTypes: ["cart", "Products", "order", "Favourite", "User", "Contact"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
