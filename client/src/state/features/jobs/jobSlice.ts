import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

interface jobStuff {
  id: number,
  location: string,
  employer_id: number,
  sitter_id: number | null,
  startDate: Date,
  endDate: Date,
  pet_plant: Array<number>
}

const initState = <any>{
  view: 'list',
  jobs: Array<jobStuff>
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initState,
  reducers: {
    getView: (state, action:PayloadAction<string>)=>{
      //state.value = action.payload;
      return state;
    },
    changeView: (state, action:PayloadAction<string>)=>{;
      state.view = action.payload;
      return state;
    },
    setJobs: (state, action:PayloadAction<Array<jobStuff>>)=>{
      state.jobs = action.payload;
      return state;
    }
  }
});

export const { getView, changeView, setJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
