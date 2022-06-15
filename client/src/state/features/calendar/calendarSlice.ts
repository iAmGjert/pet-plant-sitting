import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  value: ''
};

export const calendar = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { changeValue } = calendar.actions;

export default calendar.reducer;