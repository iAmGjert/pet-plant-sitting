import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

interface Event {
  name: string;
  // host: string
  location: string;
  description: string;
  event_participants: string[];
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}

interface EventsSliceState {
  events: Event[];
}

const initialState: any = {
  view: 'list',
  events: Array<Event>,
};

export const communityEventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    getView: (state: EventsSliceState, action: PayloadAction<string>) => {
      return { ...state, view: action.payload };
    },

    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
      return state;
    },
    getEvents: (state: EventsSliceState, action: PayloadAction<Event[]>) => {
      return { ...state, events: action.payload };
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    }
  },
});

export const { getView, setView, getEvents, setEvents } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
