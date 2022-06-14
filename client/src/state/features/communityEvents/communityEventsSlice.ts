import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';

const initialState = {
  value: '',
};

export const communityEventsSlice = createSlice({
  name: 'communityEvents',
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { changeValue } = communityEventsSlice.actions;

export default communityEventsSlice.reducer;
