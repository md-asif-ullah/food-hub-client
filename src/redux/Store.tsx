import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contectApi } from "./services/ContactService";
import { userApi } from "./services/User";
import userReducer from "./user/UserSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productApi } from "./services/ProductService";
import { cartApi } from "./services/CartService";
import { reviewsApi } from "./services/ReviwesService";
import favouriteApi from "./services/FavouriteService";
import { orderApi } from "./services/OrderService";

const rootReducer = combineReducers({
  [contectApi.reducerPath]: contectApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [favouriteApi.reducerPath]: favouriteApi.reducer,
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
      contectApi.middleware,
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      reviewsApi.middleware,
      favouriteApi.middleware,
      orderApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
