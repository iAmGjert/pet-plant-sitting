import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
// ...

export const store = configureStore({
  reducer: {
    
=======
import userProfileReducer from './features/userProfile/userProfileSlice';

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
>>>>>>> 9b4bc7e9403066aa7cc8755fbe3fcda2b71ef41e
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
