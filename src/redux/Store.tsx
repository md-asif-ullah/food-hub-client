import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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

import { cartApi } from "./services/CartService";
import { userApi } from "./services/User";
import { productApi } from "./services/ProductService";
import { orderApi } from "./services/OrderService";
import favouriteApi from "./services/FavouriteService";
import { contactApi } from "./services/ContactService";
import { reviewsApi } from "./services/ReviwesService";

const rootReducer = combineReducers({
  [favouriteApi.reducerPath]: favouriteApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
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
      contactApi.middleware,
      reviewsApi.middleware,
      favouriteApi.middleware,
      cartApi.middleware,
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export const persistor = persistStore(store);
