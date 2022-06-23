import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

//Do you even need a landingpage slice? Or should you just pull from other slices?

interface state {
  view: string,
  upcomingJobs: Array<upcomingJobs>,
  pastJobs: Array<pastJobs>,
  communityEvents: Array<eventStuff>,
  
}

const initState = {
  

}


const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState: initState,
  reducers: {
    getView: (state, action:PayloadAction<string>)=>{
      //state.value = action.payload;
      return state;
    },
    changeView: (state, action:PayloadAction<string>)=>{
      state.view = action.payload;
      //console.log('Called changeView');
      return state;
    }
  },
});

export const { getView, changeView } = landingPageSlice.actions;
export default landingPageSlice.reducer;
