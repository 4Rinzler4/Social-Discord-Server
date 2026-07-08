import { configureStore } from "@reduxjs/toolkit";
import appMainReducer from "@/redux/reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    appMain: appMainReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
