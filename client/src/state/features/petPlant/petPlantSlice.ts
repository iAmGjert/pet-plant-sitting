import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../store';

interface petPlantStuff {
  owner_id: number,
  name: string,
  image: string,
  breed: string,
  age: number,
  gender: string,
  species: number,
  tags: Array<string>,
  rating: number,
  total_ratings: number,
  is_plant: boolean,
}
interface state {
  petPlants: Array<petPlantStuff>
}

const initialState = <state>{
  petPlants: []
};
export const petPlantSlice = createSlice({
  name: 'petPlant',
  initialState,
  reducers: {
    setPetPlants: (state, action:PayloadAction<any>)=>{
      state.petPlants = action.payload;
      return state;
    },
  },
});

export const { setPetPlants } = petPlantSlice.actions;

export default petPlantSlice.reducer;
