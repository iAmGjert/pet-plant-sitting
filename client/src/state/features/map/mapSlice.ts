import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';


export const mapSlice = createSlice({
  name: 'map',
  initialState: { value: 'HELOOOO' },
  reducers: {
    getUserLocation: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  }
});

const { actions: mapActions, reducer: mapReducer } = mapSlice;

export { mapActions, mapReducer };
