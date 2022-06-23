import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
  upcomingJobs: [],
};

// Thunk Action creator
export const fetchUpcomingJobs = createAsyncThunk(
  'jobs/fetchUpcomingJobs',
  async () => {
    const response = await axios.get('/api/jobs/all');
    console.log('data coming from backend', response);
    const upcomingLabor = response.data.filter((job: { isCompleted: boolean }) => {
      //console.log('job on 75', job);
      return job.isCompleted === false;
    });
    console.log('data coming from backend', upcomingLabor);
    return upcomingLabor;
  }
)


export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: newInitialState,
  reducers: {
    getView: (state) => {
      return state;
    },
    changeView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
      return state;
    },
    setJobs: (state, action: PayloadAction<newJob[]>) => {
      state.jobs = action.payload;
      return state;
    },
    setPrompt: (state, action: PayloadAction<boolean>) => {
      state.prompt = action.payload;
      return state;
    },
    getPrompt: (state, action: PayloadAction<string>) => {
      return state.prompt;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingJobs.fulfilled, (state, action) => {
      console.log('action', action);
      state.upcomingJobs = action.payload;
      return state;
    });
  },
});

export const { getView, changeView, setJobs, setPrompt, getPrompt } = jobsSlice.actions;

export default jobsSlice.reducer;
