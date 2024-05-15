import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { contectApi } from "./services/ContactService";

export const store = configureStore({
  reducer: {
    [contectApi.reducerPath]: contectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contectApi.middleware),
});

setupListeners(store.dispatch);
