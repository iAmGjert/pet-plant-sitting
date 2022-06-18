import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initialState = {
  value: { name: '', id: 0, location: '', job: [], image: '' },
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
      return state;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { changeName, setUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;
