import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: { 
    userLocation: '', 
    user: {}, job: {}, 
    jobsLocations: [], 
    userLocationGeoLng: 0, 
    userLocationGeoLat: 0, 
    users: [], 
    petsPlants: [], 
    events: [],
    eventsLocations: []
  },

  reducers: {
    getUserLocation: (state, action: PayloadAction<string>) => {
      state.userLocation = action.payload;
      return state;
    },
    getJob: (state, action: PayloadAction<object>) => {
      state.job = action.payload;
      return state;
    },
    getJobsLocations: (state, action: PayloadAction<any>) => {
      state.jobsLocations = action.payload;
      return state;
    },
    getUserLocationGeoLng: (state, action: PayloadAction<number>) => {
      state.userLocationGeoLng = action.payload;
      return state;
    },
    getUserLocationGeoLat: (state, action: PayloadAction<number>) => {
      state.userLocationGeoLat = action.payload;
      return state;
    },
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
      return state;
    },
    setPetsPlants: (state, action: PayloadAction<any>) => {
      state.petsPlants = action.payload;
      return state;
    },
    setEvents: (state, action: PayloadAction<any>) => {
      state.events = action.payload;
      return state;
    },
    getEventsLocations: (state, action: PayloadAction<any>) => {
      state.eventsLocations = action.payload;
      return state;
    }
  }
});

const { actions: mapActions, reducer: mapReducer } = mapSlice;

export { mapActions, mapReducer };
