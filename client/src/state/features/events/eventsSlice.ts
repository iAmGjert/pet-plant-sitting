import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

//! REFACTOR: Async THUNK

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
  };
}



const initialState: any = {
  view: 'list',
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
};

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
  },
});

export const { setView, setEvents, setEventObj } =
  communityEventsSlice.actions;

export default communityEventsSlice.reducer;
