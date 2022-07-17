import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type {
  BOTWCompendiumResponseData,
  BOTWCompendiumArray,
  Category,
} from '../../types';

export interface State {
  compendium: null | BOTWCompendiumResponseData;
  compendiumArray: null | BOTWCompendiumArray;
  elementsToRender: null | BOTWCompendiumResponseData;
  error: string | boolean;
  search: string;
  category: string;
}

const initialState: State = {
  compendium: null,
  compendiumArray: null,
  elementsToRender: null,
  error: '',
  search: '',
  category: 'All',
};

export const compendiumSlice = createSlice({
  name: 'compendium',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCompendiumFromData: (
      state: State,
      action: PayloadAction<BOTWCompendiumResponseData>,
    ) => {
      state.compendium = action.payload;
      state.elementsToRender = action.payload;
    },
    setError: (state: State) => {
      state.error = true;
    },
    setCategory: (state: State, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setElementsToRender: (
      state: State,
      action: PayloadAction<BOTWCompendiumResponseData>,
    ) => {
      state.elementsToRender = action.payload;
    },
    setElementsInArray: (
      state: State,
      action: PayloadAction<BOTWCompendiumArray>,
    ) => {
      state.compendiumArray = action.payload;
    },
    setSearch: (state: State, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setCompendiumFromData,
  setError,
  setCategory,
  setElementsToRender,
  setElementsInArray,
  setSearch,
} = compendiumSlice.actions;

export const selectCompendium = (state: RootState) => state.compendium;

export default compendiumSlice.reducer;
