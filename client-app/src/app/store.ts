import { configureStore } from "@reduxjs/toolkit";
import venuesStore from "../features/venues/venuesStore";
import { venuesApi } from "../features/venues/venuesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    venues: venuesStore,
    [venuesApi.reducerPath]: venuesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(venuesApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
