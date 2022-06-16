import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';


export const mapSlice = createSlice({
  name: 'map',
  initialState: { location: '' },
  reducers: {
    getUserLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
      return state;
    },
  }
});

const { actions: mapActions, reducer: mapReducer } = mapSlice;

export { mapActions, mapReducer };
