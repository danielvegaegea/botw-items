import { createSlice } from '@reduxjs/toolkit';

export interface State {
  compendium: string;
  elementsToRender: string;
  error: string | boolean;
  search: string;
  category: string;
}

interface Action {
  payload: string;
  type: string;
}

const initialState: State = {
  compendium: '',
  elementsToRender: '',
  error: '',
  search: '',
  category: 'All',
};

export const compendiumSlice = createSlice({
  name: 'hyruleCompendium ',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCompendiumFromData: (state: State, action: Action) => {
      state.compendium = action.payload;
      state.elementsToRender = action.payload;
    },
    setError: (state: State) => {
      state.error = true;
    },
    setCategory: (state: State, action: Action) => {
      state.category = action.payload;
    },
    setElementsToRender: (state: State, action: Action) => {
      state.elementsToRender = action.payload;
    },
    setSearch: (state: State, action: Action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setCompendiumFromData,
  setError,
  setCategory,
  setElementsToRender,
  setSearch,
} = compendiumSlice.actions;

export const selectCompendium = (state: State) => state.compendium;

export default compendiumSlice.reducer;
