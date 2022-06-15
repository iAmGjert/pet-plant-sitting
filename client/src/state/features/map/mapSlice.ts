import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initState = {
  value: 'shiny piece of garbage'
};

export const mapSlice = createSlice({
  name: 'userProile',
  initialState: initState,
  reducers: {
    changeName: (state, action: PayloadAction<string>)=>{
      state.value = action.payload;
      return state;
    },
  }
});

export const { changeName } = mapSlice.actions;

export default mapSlice.reducer;
