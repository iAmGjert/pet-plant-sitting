import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

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
    }}>;
    event_participants: Array<{ 
    id: number; 
    user: {
      name: string;
      image: string;
    }}>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}

// interface EventsSliceState {
//   events: Event[];
// }

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
  }
};

export const communityEventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // getView: (state: EventsSliceState, action: PayloadAction<string>) => {
    //   return { ...state, view: action.payload };
    // },

    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
      return state;
    },
    // getEvents: (state: EventsSliceState, action: PayloadAction<Event[]>) => {
    //   return { ...state, events: action.payload };
    // },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      return state;
    }, 
    // setEvent: (state, action: PayloadAction<Event>) => {
    //   state.event = action.payload;
    //   return state;
    // },
    setEventObj: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
      return state;
    }
  },
});

export const { /*getView, getEvents,*/ setView, setEvents, setEventObj } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
