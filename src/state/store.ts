import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bgColorSlice from "./bgColorSlice";

export const store = configureStore({
  reducer: { color: bgColorSlice, auth: authSlice },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
