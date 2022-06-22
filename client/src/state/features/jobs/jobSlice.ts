import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

interface newJob {
  id: number;
  pet_plant: Array<number>,
  sitter_id: number;
  employer_id: number;
  location: string;
  description: string;
  job_applicant: Array<{
    id: number;
    user: {
      name: string;
      image: string;
    };
  }>;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
}
const newInitialState: any = {
  view: 'list',
  jobs: [],
  job: {
    sitter_id: 0,
    employer_id: 0,
    location: '',
    description: '',
    job_applicant: [],
    startDate: new Date(),
    isCompleted: false,
  },
  prompt: false,
};


export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: newInitialState,
  reducers: {
    getView: (state)=>{
      return state;
    },
    changeView: (state, action:PayloadAction<string>)=>{
      state.view = action.payload;
      return state;
    },
    setJobs: (state, action:PayloadAction<newJob[]>)=>{
      state.jobs = action.payload;
      return state;
    },
    setPrompt: (state, action:PayloadAction<boolean>)=>{
      state.prompt = action.payload;
      return state;
    },
    getPrompt: (state, action:PayloadAction<string>)=>{
      return state.prompt;
    },
  }
});

export const { getView, changeView, setJobs, setPrompt, getPrompt } = jobsSlice.actions;

export default jobsSlice.reducer;
