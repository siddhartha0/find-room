import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../local/auth";
import { MainApi } from "../api/ApiGateway";

export const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
    localAuth: authReducer,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(MainApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
