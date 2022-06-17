import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';


export const mapSlice = createSlice({
  name: 'map',
  initialState: { userLocation: '', user: {}, job: {}, jobLocation: '', userLocationGeoLng: 0, userLocationGeoLat: 0 },
  reducers: {
    getUserLocation: (state, action: PayloadAction<string>) => {
      state.userLocation = action.payload;
      return state;
    },
    // getUser: (state, action: PayloadAction<object>) => {
    //   state.user = action.payload;
    //   return state;
    // },
    getJob: (state, action: PayloadAction<object>) => {
      state.job = action.payload;
      return state;
    },
    getJobLocation: (state, action: PayloadAction<string>) => {
      state.jobLocation = action.payload;
      return state;
    },
    getUserLocationGeoLng: (state, action: PayloadAction<number>) => {
      state.userLocationGeoLng = action.payload;
      return state;
    },
    getUserLocationGeoLat: (state, action: PayloadAction<number>) => {
      state.userLocationGeoLat = action.payload;
      return state;
    }
  }
});

const { actions: mapActions, reducer: mapReducer } = mapSlice;

export { mapActions, mapReducer };
