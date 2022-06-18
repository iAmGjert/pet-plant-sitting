import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  calendar: {
    date: new Date(),
    selectedDate: new Date()
  },
  happenings: [],
  value: ''
};

export const calendar = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    //action is changeValue. payload is 
    changeValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
    addText: (state, action:PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    }
  },
});

//when you add actions, put another action in destructured object below
export const { changeValue, addText } = calendar.actions;


export default calendar.reducer;