// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// Types
import type { TypeBOTWCompendiumArray } from '../../types';

export interface State {
  compendiumMasterArray: null | TypeBOTWCompendiumArray;
  idArray: string[];
  elementsToRender: null | TypeBOTWCompendiumArray;
  error: boolean;
  errorMsg: string;
  search: string;
}

export const initialState: State = {
  compendiumMasterArray: null,
  idArray: [],
  elementsToRender: null,
  error: false,
  errorMsg: '',
  search: '',
};

export const compendiumMasterSlice = createSlice({
  // Default
  name: 'compendiumMaster',
  initialState,
  // El campo 'reducers' nos permite definir reductores y generar acciones asociadas.
  reducers: {
    setCompendiumMasterFromData: (
      state: State,
      action: PayloadAction<TypeBOTWCompendiumArray>,
    ) => {
      state.compendiumMasterArray = action.payload;
    },
    setIdArray: (state: State, action: PayloadAction<string[]>) => {
      state.idArray = action.payload;
    },
    setError: (state: State) => {
      state.error = true;
    },
    setErrorMsg: (state: State, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    setElementsToRender: (
      state: State,
      action: PayloadAction<TypeBOTWCompendiumArray>,
    ) => {
      state.elementsToRender = action.payload;
    },
    setSearch: (state: State, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setCompendiumMasterFromData,
  setIdArray,
  setError,
  setErrorMsg,
  setElementsToRender,
  setSearch,
} = compendiumMasterSlice.actions;

export const selectCompendiumMaster = (state: RootState) =>
  state.compendiumMaster;

export default compendiumMasterSlice.reducer;
