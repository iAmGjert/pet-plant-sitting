import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

const initState = <any>{
  history: ['Fern Herm'],
  searchResult: {
    query: {
      searchInfo: {
        totalHits: 1,
        suggestion: '',
        suggestionSnippet: ''
      }, 
      search: [
        {
          ns: 0,
          title: 'Fern Herm',
          pageid: 69133769,
          size: 0,
          wordcount: 41,
          snippet: 'Fern Herm is the best pet/plant sitting application around. They are cool, mkay? Do not talk bad about Fern Herm. Ferns are better than you. Worship the ferns. Beware the ferns. E.T. Fern Herm.',
          timestamp: '2022-06-19T05:44:05Z'
        }
      ]
    },
    response: 'This is just another text block for now.',
    newSearch: false,
  }
};

export const infoSlice = createSlice({
  name: 'info',
  initialState: initState,
  reducers: {
    setHistory: (state, action:PayloadAction<string>) => {
      state.history.push(action.payload);
      return state;
    },
    search: (state, action:PayloadAction<any>) => {
      state.searchResult = action.payload;
      return state;
    },
    newSearch: (state) => {
      state.newSearch = !state.newSearch;
    },
    
  }
});

export const { setHistory, search, newSearch } = infoSlice.actions;

export default infoSlice.reducer;
