import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
// import { RootState } from '../../store';


interface Status {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

interface Event {
  id: number;
  name: string;
  host: number;
  location: string;
  description: string;
  event_comments: Array<{
    id: number;
    comment: string;
    user: {
      id: number;
      name: string;
      image: string;
    };
  }>;
  event_participants: Array<{
    id: number;
    user: {
      name: string;
      image: string;
    };
  }>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}

const initialState: any = {
  view: 'list', // list, details, create-event
  status: 'idle', // idle, loading, success, error
  events: [],
  event: {
    name: '',
    host: 0,
    location: '',
    description: '',
    event_comments: [],
    event_participants: [],
    startDate: new Date(),
    startTime: new Date(),
  },
  upcomingEvents: [], //check to see how this is connected? I'm still not sure how
};

//Thunk Action Creator
export const fetchUpcomingEvents = createAsyncThunk( 'events/upcomingEvents', async () => {
  const response = await axios.get('/api/events/all');
  const upcomingEvents = response.data.filter((event : {startDate: Date}) => {
    const currentDate = moment();//'2022-06-03'
    return moment(event.startDate).isAfter(currentDate);
  });
  return upcomingEvents;
});

export const fetchEvents = createAsyncThunk( 'events/fetchEvents', async () => {
  try {
    const response = await axios.get('/api/events/all');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const communityEventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
      return state;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      return state;
    },
    setEventObj: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
      // console.log(state.event);
      return state;
    },
    eventAdded: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      return state;
    }
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEvents = action.payload;
      });
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = 'loading';
      });
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      });
    builder
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export const selectAllEvents = (state: { events: { events: Event } } ) => state.events.events;
export const getEventsStatus = (state: { events: { status: string } } ) => state.events.status;

export const { setView, setEvents, setEventObj, eventAdded } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
