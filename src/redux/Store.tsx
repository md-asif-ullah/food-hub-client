import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contectApi } from "./services/ContactService";

import userReducer from "./user/UserSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reviewsApi } from "./services/ReviwesService";
import { baseQueryApi } from "@/pages/hooks/baseQueryWithReauth";

const rootReducer = combineReducers({
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
  [contectApi.reducerPath]: contectApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,

  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      contectApi.middleware,
      reviewsApi.middleware,
      baseQueryApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export const persistor = persistStore(store);
