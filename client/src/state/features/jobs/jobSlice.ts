import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initState = {
  value: 'shiny piece of garbage'
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initState,
  reducers: {
    createJob: (state, action:PayloadAction<string>)=>{
      //state.value = action.payload;
      console.log(state, action);
      return state;
    },
  }
});

export const { createJob } = jobsSlice.actions;

export default jobsSlice.reducer;
