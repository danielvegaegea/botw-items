import { createSlice } from '@reduxjs/toolkit';

type State = {
  compendium: [];
  elementsToRender: [];
  error: boolean;
  search: string;
  category: string;
};

const initialState: State = {
  compendium: [],
  elementsToRender: [],
  error: false,
  search: '',
  category: 'All',
};

export const hyruleCompendiumSlice = createSlice({
  name: 'compendiumElement',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setElementsFromData: (state, action) => {
      state.compendium = action.payload;
      state.elementsToRender = action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setElementsToRender: (state, action) => {
      state.elementsToRender = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setElementsFromData,
  setError,
  setCategory,
  setElementsToRender,
  setSearch,
} = hyruleCompendiumSlice.actions;

export const selectCompendiumElement = (state: State) => state.compendium;

export default hyruleCompendiumSlice.reducer;
