import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initState = {
  value: 'shiny piece of garbage'
};

export const infoSlice = createSlice({
  name: 'jobs',
  initialState: initState,
  reducers: {
    getInfo: (state, action:PayloadAction<string>)=>{
      //state.value = action.payload;
      console.log(state, action);
      return state;
    },
  }
});

export const { getInfo } = infoSlice.actions;

export default infoSlice.reducer;
