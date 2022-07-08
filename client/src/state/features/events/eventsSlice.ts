import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
// import { RootState } from '../../store';

export interface Event {
  id: number;
  name: string;
  host: number | null;
  location: string;
  description: string;
  event_comments: Array<{
    id: number;
    comment: string;
    user: {
      id: number;
      name: string;
      image: string | null;
    };
  }> | null;
  event_participants: Array<{
    id: number;
    user: {
      id: number;
      name: string;
      image: string | null;
    };
  }> | null;
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  user: {
    id: number;
    name: string;
    image: string | null;
  } | null;
}

interface Comment {
  // id: number | null;
  event_id: number;
  comment: string;
  user_id: number;
  user: {
    id: number;
    name: string;
    image: string | null;
  };
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

// ------------------------ EVENTS --------------------------

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const response = await axios.get('/api/events/all');
    return response.data;
  } catch (error) { console.error(error); }
});

export const addNewEvent = createAsyncThunk('events/addNewEvent', async (event: {
  name: string; host: number; location: string; description: string; startDate: Date | string; startTime: Date | string; user: { name: string, id: number}}) => {
  try {
    const response = await axios.post('/api/events/create', event);
    return response.data;
  } catch (error) { console.error(error); }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event: {
  id: number; name: string; host: number; location: string; description: string; startDate: Date | string; startTime: Date | string; user: { name: string, id: number}}) => {
  const { id } = event;
  try {
    const response = await axios.put(`/api/events/update/${id}`, event);
    return response.data;
  } catch (error) { console.error(error); }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: number) => {
  try {
    const response = await axios.delete(`/api/events/delete/${id}`);
    return response.data;
  } catch (error) { console.error(error); }
});

// ------------------------ EVENT COMMENTS --------------------------

export const addComment = createAsyncThunk('events/addComment', async (comment: Comment) => {
  try {
    const response = await axios.post('/api/events/comment/add', comment);
    return response.data;
  } catch (error) { console.error(error); }
});

export const updateComment = createAsyncThunk('events/updateComment', 
  async (comment: { id: number, comment: string, event_id: number, user_id: number, 
  user: { id: number, name: string, image: string | null } }) => {
    try {
      // console.log(comment);
      const { id } = comment;
      await axios.put(`/api/events/comment/update/${id}`, comment);
      return comment;
    } catch (error) { console.error(error); }
  });

export const deleteComment = createAsyncThunk('events/deleteComment', 
  async (comment: { id: number, comment: string, event_id: number, user_id: number, 
  user: { id: number, name: string, image: string | null } }) => {
    try {
      const { id } = comment;
      const response = await axios.delete(`/api/events/comment/delete/${id}`);
      return response.data;
    } catch (error) { console.error(error); }
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
      return state;
    },
    eventAdded: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      return state;
    },
    commentAdded: (state, action: PayloadAction<Comment>) => {
      state.event.event_comments.push(action.payload);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEvents = action.payload;
      });
    // ----------------------- EVENTS -----------------------
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      });
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      });
    builder
      .addCase(fetchEvents.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action);
        state.events.push({...action.meta.arg, event_comments: [], event_participants: []});
      });
    builder 
      .addCase(updateEvent.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const events = state.events.filter((event: { id: number; }) => event.id !== id);
        state.events = [...events, action.payload];     
      });
    builder
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const events = state.events.filter((event: { id: number; }) => event.id !== id);
        state.events = events;
      });
    // ----------------------- EVENT COMMENTS -----------------------
    
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log({ ...action.payload, user: { ...action.meta.arg.user }});
        const newComment = { ...action.payload, user: { ...action.meta.arg.user }};
        state.event.event_comments.push(newComment);
        state.events.splice(state.event.id - 1, 1, state.event);
      });
    builder
      .addCase(updateComment.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const comments = state.event.event_comments.filter((comment: { id: number; }) => comment.id !== id);
        state.event.event_comments = [...comments, action.meta.arg];
        state.events.splice(state.event.id - 1, 1, state.event);
      });
    builder
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload !== 'OK') {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.meta.arg;
        const comments = state.event.event_comments.filter((comment: { id: number; }) => comment.id !== id);
        state.event.event_comments = comments;
        state.events.splice(state.event.id - 1, 1, state.event);
      });

  }
});

export const selectAllEvents = (state: { events: { events: Event } } ) => state.events.events;
export const getEventsStatus = (state: { events: { status: string } } ) => state.events.status;
export const pageView = (state: { events: { view: string } } ) => state.events.view;

export const { setView, setEvents, setEventObj, eventAdded, commentAdded } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
