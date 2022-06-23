import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface messageDetails {
  id: number,
  sender_id: number,
  receiver_id: number,
  text: string,
  createdAt: string
}

interface userOnline {
  name: string,
  socketId: string
}
interface state {
  view: string,
  receivedMessages: Array<messageDetails>,
  sentMessages: Array<messageDetails>,
  usersOnline: Array<userOnline>
}

const initialState = <state>{
  view: 'usersOnline',
  receivedMessages: [],
  sentMessages: [],
  usersOnline: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    changeView: (state, action: PayloadAction<string>) => {
      state.view = action.payload; 
    },
    getReceivedMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.receivedMessages = action.payload;
    },
    getSentMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.sentMessages = action.payload;
    },
    getUserOnline: (state, action: PayloadAction<userOnline>) => {
      state.usersOnline.push(action.payload);
    }
  }
});

export const { changeView, getReceivedMessages, getSentMessages, getUserOnline } = chatSlice.actions;

export default chatSlice.reducer;

