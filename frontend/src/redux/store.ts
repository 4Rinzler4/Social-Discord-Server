import { configureStore } from '@reduxjs/toolkit'
import appUserReducer from '@/redux/reducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appApi } from './apiSlice'

export const store = configureStore({
  reducer: {
    appUser: appUserReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
