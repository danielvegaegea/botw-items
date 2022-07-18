import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { Action } from 'history';
import { RootState } from '../../app/store';
import type {
  T_BOTWCompendiumResponseData,
  T_BOTWCompendiumArray,
  T_Category,
  /* T_ElementPage, */
} from '../../types';

export interface State {
  compendium: null | T_BOTWCompendiumResponseData;
  compendiumArray: null | T_BOTWCompendiumArray;
  elementsToRender: null | T_BOTWCompendiumArray;
  error: boolean;
  errorMsg: string;
  search: string;
  category: string;
  /* ePage: T_ElementPage; */
}

const initialState: State = {
  compendium: null,
  compendiumArray: null,
  elementsToRender: null,
  error: false,
  errorMsg: '',
  search: '',
  category: 'All',
  /* ePage: {
    c_name: '',
    c_imgSrc: '',
    c_id: 0,
  }, */
};

export const compendiumSlice = createSlice({
  name: 'compendium',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCompendiumFromData: (
      state: State,
      action: PayloadAction<T_BOTWCompendiumResponseData>,
    ) => {
      state.compendium = action.payload;
      //state.elementsToRender = action.payload;
    },
    setError: (state: State) => {
      state.error = true;
    },
    setErrorMsg: (state: State, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    setCategory: (state: State, action: PayloadAction<T_Category>) => {
      state.category = action.payload;
    },
    setElementsToRender: (
      state: State,
      action: PayloadAction<T_BOTWCompendiumArray>,
    ) => {
      state.elementsToRender = action.payload;
    },
    setElementsInArray: (
      state: State,
      action: PayloadAction<T_BOTWCompendiumArray>,
    ) => {
      state.compendiumArray = action.payload;
    },
    setSearch: (state: State, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    /* setEpage: (state: State, action: PayloadAction<T_ElementPage>) => {
      state.ePage.c_name = action.payload.c_name;
      state.ePage.c_imgSrc = action.payload.c_imgSrc;
      state.ePage.c_id = action.payload.c_id;
    }, */
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
  /* setEpage, */
} = compendiumSlice.actions;

export const selectCompendium = (state: RootState) => state.compendium;

export default compendiumSlice.reducer;
