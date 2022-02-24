import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/auth-slice";
import { productApi } from "../features/products/products-api";
import { useSelector as rawUseSelector } from "react-redux";
import { categoryApi } from "../features/categories/categories-api";
import { authSliceFirebase } from "../features/firebase/firebase-reducer";
import { TypedUseSelectorHook } from "react-redux";
import cartSlice from "../features/shoppingCart/cart-slice";
import { getAllCartItems } from "../features/shoppingCart/cart-slice";
import search from "../features/products/search";

export const store = configureStore({
  reducer: {
    cartItem: cartSlice,
    auth: authSlice.reducer,
    firebase: authSliceFirebase.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    search: search,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.dispatch(getAllCartItems);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
