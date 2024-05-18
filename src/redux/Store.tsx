import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contectApi } from "./services/ContactService";
import { userApi } from "./services/User";

export const store = configureStore({
  reducer: {
    [contectApi.reducerPath]: contectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contectApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
