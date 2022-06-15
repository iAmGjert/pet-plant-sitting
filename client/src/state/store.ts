import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './features/userProfile/userProfileSlice';
import infoReducer from './features/info/infoSlice';
import jobsReducer from './features/jobs/jobSlice';
import { mapReducer } from './features/map/mapSlice';

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    info: infoReducer,
    job: jobsReducer,
    map: mapReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
