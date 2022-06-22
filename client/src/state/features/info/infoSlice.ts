import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initState = <any>{
  searches: ['fern'],
  searchResult: {
    query: 'fern',
    response: 'Ferns are cool, mkay? Do not talk bad about ferns. If I hear one negative fern comment I will end you. Ferns are better than you. Worship the ferns. Beware the ferns. E.T. Fern Herm'
  }
};

export const infoSlice = createSlice({
  name: 'info',
  initialState: initState,
  reducers: {
    saveSearch: (state, action:PayloadAction<string>) => {
      state.searches.push(action.payload);
      return state;
    },
    search: (state, action:PayloadAction<string>) => {
      return state.searchResult;
    },
  }
});

export const { saveSearch, search } = infoSlice.actions;

export default infoSlice.reducer;
