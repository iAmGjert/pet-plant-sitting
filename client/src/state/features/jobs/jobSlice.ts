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

interface state {
  view: string,
  jobs: Array<jobStuff>
}

const initState = <state>{
  view: 'list',
  jobs: [],
  job: {
    name: '',
    host: 0,
    pet_plant: [],
    location: '',
    description: '',
    applicants: [],
    startDate: new Date(),
    endDate: new Date(),
  }
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initState,
  reducers: {
    getView: (state, action:PayloadAction<string>)=>{
      //state.value = action.payload;
      return state;
    },
    changeView: (state, action:PayloadAction<string>)=>{
      state.view = action.payload;
      //console.log('Called changeView');
      return state;
    },
    setJobs: (state, action:PayloadAction<Array<jobStuff>>)=>{
      state.jobs = action.payload;
      return state;
    },
    setJobObj: (state, action: PayloadAction<Event>) => {
      state.job = action.payload;
      return state;
    }
  }
});

export const { getView, changeView, setJobs, setJobObj } = jobsSlice.actions;

export default jobsSlice.reducer;
