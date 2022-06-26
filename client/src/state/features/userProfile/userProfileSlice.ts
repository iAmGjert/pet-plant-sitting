import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNull } from 'util';
//import type { RootState } from '../../store';

interface userStuff {
  name: string;
  image: string;
  location: string;
  sitter_rating: number;
  total_sitter_ratings: number;
  bio: string;
  average_rating: number;
  total_ratings: number;
  gallery_id: number;
  theme: string
}

interface jobStuff {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
}
interface state {
  value: {
    name: string;
    id: number | null;
    username: string,
    job: Array<jobStuff>;
    image: string;
    location: string;
    sitter_rating: number;
    total_sitter_ratings: number;
    bio: string;
    average_rating: number;
    total_ratings: number;
    gallery_id: number;
    theme: string
  };
  users: Array<userStuff>;
}

const initialState = {
  value: {
    name: '',
    id: 1,
    username: '',
    job: [],
    image: '',
    location: '',
    sitter_rating: 0,
    total_sitter_ratings: 0,
    bio: '',
    average_rating: 0,
    total_ratings: 0,
    gallery_id: 0,
    theme: ''
  },
  users: [],
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
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
      return state;
    },
  },
});

export const { changeName, setUser, setUsers } = userProfileSlice.actions;

export default userProfileSlice.reducer;
