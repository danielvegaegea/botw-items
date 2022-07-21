import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type {
  TypeBOTWCompendiumResponseData,
  TypeBOTWCompendiumArray,
  TypeCategory,
} from '../../types';

export interface State {
  compendium: null | TypeBOTWCompendiumResponseData;
  compendiumArray: null | TypeBOTWCompendiumArray;
  elementsToRender: null | TypeBOTWCompendiumArray;
  error: boolean;
  errorMsg: string;
  search: string;
  category: string;
}

export const initialState: State = {
  compendium: null,
  compendiumArray: null,
  elementsToRender: null,
  error: false,
  errorMsg: '',
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
      action: PayloadAction<TypeBOTWCompendiumResponseData>,
    ) => {
      state.compendium = action.payload;
    },
    setError: (state: State) => {
      state.error = true;
    },
    setErrorMsg: (state: State, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    setCategory: (state: State, action: PayloadAction<TypeCategory>) => {
      state.category = action.payload;
    },
    setElementsToRender: (
      state: State,
      action: PayloadAction<TypeBOTWCompendiumArray>,
    ) => {
      state.elementsToRender = action.payload;
    },
    setElementsInArray: (
      state: State,
      action: PayloadAction<TypeBOTWCompendiumArray>,
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
  setErrorMsg,
  setCategory,
  setElementsToRender,
  setElementsInArray,
  setSearch,
} = compendiumSlice.actions;

export const selectCompendium = (state: RootState) => state.compendium;

export default compendiumSlice.reducer;
