import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface messageDetails {
  id: number,
  sender_id: number,
  receiver_id: number,
  text: string,
  createdAt: string
}

interface state {
  receivedMessages: Array<messageDetails>,
  sentMessages: Array<messageDetails>
}

const initialState = <state>{
  receivedMessages: [],
  sentMessages: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    getReceivedMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.receivedMessages = action.payload;
    },
    getSentMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.sentMessages = action.payload;
    }
  }
});

export const { getReceivedMessages, getSentMessages } = chatSlice.actions;

export default chatSlice.reducer;

