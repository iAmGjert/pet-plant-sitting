import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

interface Event {
  name: string;
  location: string;
  description: string;
}

interface EventsSliceState {
  events: Event[];
}

const initialState: EventsSliceState = {
  events: [],
};

export const communityEventsSlice = createSlice({
  name: 'communityEvents',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<string>) => {
      state.events = [
        ...state.events,
        {
          name: action.payload,
          location: '',
          description: '',
        },
      ];
    },
  },
});

export const { addEvent } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
