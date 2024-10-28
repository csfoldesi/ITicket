import { configureStore } from "@reduxjs/toolkit";
import venuesStore from "../../features/venues/venuesStore";
import { setupListeners } from "@reduxjs/toolkit/query";
import accountsStore from "../../features/accounts/accountsStore";
import eventsStore from "../../features/events/eventsStore";
import { BaseApi, RefreshTokenApi } from "../api/BaseApi";

export const store = configureStore({
  reducer: {
    venues: venuesStore,
    accounts: accountsStore,
    events: eventsStore,
    [BaseApi.reducerPath]: BaseApi.reducer,
    [RefreshTokenApi.reducerPath]: RefreshTokenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware).concat(RefreshTokenApi.middleware),
  preloadedState: {
    accounts: {
      userInfo: localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")!) : null,
    },
  },
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
