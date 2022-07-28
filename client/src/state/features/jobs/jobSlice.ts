import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUS_CODES } from 'http';
import moment from 'moment';
//import type { RootState } from '../../store';

export interface newJob {
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
    endDate: new Date(), 
    isCompleted: false,
  },
  prompt: false,
  upcomingJobs: [],
  applications: [],
  pastJobs: []
};

export const fetchPastJobs = createAsyncThunk(
  'jobs/fetchPastJobs',
  async() => {
    const response = await axios.get('/api/jobs/all');
    //console.log('fetchPastJobs response', response);
    const currentDate = moment().format('YYYY-MM-DD');
    // console.log('currentDate from the backend',currentDate);
    //console.log('currentDate on 47 backend', currentDate);
    const pastLabor = response.data.filter((event: {startDate: Date, endDate: Date}) => {
      return moment(event.startDate).isBefore(currentDate);
    });
    // console.log('pastLabor on 52', pastLabor);
    return pastLabor;
  }
);

// Thunk Action creator
export const fetchUpcomingJobs = createAsyncThunk(
  'jobs/fetchUpcomingJobs',
  async () => {
    const response = await axios.get('/api/jobs/all');
    // console.log('data coming from backend', response);
    // const upcomingLabor = response.data.filter((job: { isCompleted: boolean }) => {
    //   console.log('job on 75', job);
    //   return job.isCompleted === false;
    // });
    const currentDate = moment().format('YYYY-MM-DD');
    const upcomingLabor = response.data.filter((job: {startDate: Date}) => {
      return moment(job.startDate).isAfter(currentDate);
    });
    // console.log('data coming from backend', upcomingLabor);
    return upcomingLabor;
  }
);

export const fetchApplications = createAsyncThunk(
  'jobs/fetchApplications',
  async() => {
    const response = await axios.get('/api/jobapplicants/byuser');
    //const response = await axios.get(`/api/jobapplicants/byuser/${id}`);
    return response.data;
  }
);

export const deleteApplication = createAsyncThunk(
  'jobs/deleteApplicaiton',
  async(id) => {
    const response = await axios.delete(`/api/jobapplicants/delete/${id}`);
    return id;//returning this to return id;
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deletejob',
  async(id) => {
    const response = await axios.delete(`/api/jobs/delete/${id}`);
    return id;//action creators to update state
  }
);

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
      // console.log('action', action);
      state.upcomingJobs = action.payload;
      return state;
    });
    builder.addCase(fetchApplications.fulfilled, (state, action) => {
      // console.log('application', action.payload);
      state.applications = action.payload;
      return state;
    });
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      //console.log('delete application payload', action.payload, state.applications);
      state.applications = state.applications.filter((application) => {
        return application.id !== action.payload;
      });
    });
    builder.addCase(fetchPastJobs.fulfilled, (state, action) => {
      state.pastJobs = action.payload;
      return state;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.jobs = state.jobs.filter((job) => {
        //console.log('what is job id and action id', job.id, action.payload)
        return job.id !== action.payload;//filtering by the payload, which is whatever is returned from the function
      });
    });
  }
});

export const { getView, changeView, setJobs, setPrompt, getPrompt } = jobsSlice.actions;

export default jobsSlice.reducer;
