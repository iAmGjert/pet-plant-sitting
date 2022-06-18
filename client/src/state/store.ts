import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './features/userProfile/userProfileSlice';
import infoReducer from './features/info/infoSlice';
import jobsReducer from './features/jobs/jobSlice';
import { mapReducer } from './features/map/mapSlice';
import calendarReducer from './features/calendar/calendarSlice';
import communityEventsReducer from './features/events/eventsSlice';
import petPlantReducer from './features/petPlant/petPlantSlice';


export const store = configureStore({
  reducer: {
    events: communityEventsReducer,
    userProfile: userProfileReducer,
    info: infoReducer,
    job: jobsReducer,
    map: mapReducer,
    calendar: calendarReducer,
    petPlant: petPlantReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
