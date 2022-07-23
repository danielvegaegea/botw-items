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
  compentiumEqAxesArray: null | TypeBOTWCompendiumArray;
  compentiumEqArrowsArray: null | TypeBOTWCompendiumArray;
  compentiumEqBladesArray: null | TypeBOTWCompendiumArray;
  compentiumEqBluntArray: null | TypeBOTWCompendiumArray;
  compentiumEqBowsArray: null | TypeBOTWCompendiumArray;
  compentiumEqHammersArray: null | TypeBOTWCompendiumArray;
  compentiumEqLongArray: null | TypeBOTWCompendiumArray;
  compentiumEqNonCombatArray: null | TypeBOTWCompendiumArray;
  compentiumEqRodsArray: null | TypeBOTWCompendiumArray;
  compentiumEqThrowingArray: null | TypeBOTWCompendiumArray;
  compentiumEqShieldsArray: null | TypeBOTWCompendiumArray;
  elementsToRender: null | TypeBOTWCompendiumArray;
  error: boolean;
  errorMsg: string;
  search: string;
  category: string;
}

export const initialState: State = {
  compendium: null,
  compendiumArray: null,
  compentiumEqAxesArray: null,
  compentiumEqArrowsArray: null,
  compentiumEqBladesArray: null,
  compentiumEqBluntArray: null,
  compentiumEqBowsArray: null,
  compentiumEqHammersArray: null,
  compentiumEqLongArray: null,
  compentiumEqNonCombatArray: null,
  compentiumEqRodsArray: null,
  compentiumEqThrowingArray: null,
  compentiumEqShieldsArray: null,
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
    setCategoriesInArray: (
      state: State,
      action: PayloadAction<{
        Axes: TypeBOTWCompendiumArray;
        Arrows: TypeBOTWCompendiumArray;
        Blades: TypeBOTWCompendiumArray;
        Blunt: TypeBOTWCompendiumArray;
        Bows: TypeBOTWCompendiumArray;
        Hammers: TypeBOTWCompendiumArray;
        Long: TypeBOTWCompendiumArray;
        NonCombat: TypeBOTWCompendiumArray;
        Rods: TypeBOTWCompendiumArray;
        Throwing: TypeBOTWCompendiumArray;
        Shields: TypeBOTWCompendiumArray;
      }>,
    ) => {
      state.compentiumEqAxesArray = action.payload.Axes;
      state.compentiumEqArrowsArray = action.payload.Arrows;
      state.compentiumEqBladesArray = action.payload.Blades;
      state.compentiumEqBluntArray = action.payload.Blunt;
      state.compentiumEqBowsArray = action.payload.Bows;
      state.compentiumEqHammersArray = action.payload.Hammers;
      state.compentiumEqLongArray = action.payload.Long;
      state.compentiumEqNonCombatArray = action.payload.NonCombat;
      state.compentiumEqRodsArray = action.payload.Rods;
      state.compentiumEqThrowingArray = action.payload.Throwing;
      state.compentiumEqShieldsArray = action.payload.Shields;
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
  setCategoriesInArray,
  setSearch,
} = compendiumSlice.actions;

export const selectCompendium = (state: RootState) => state.compendium;

export default compendiumSlice.reducer;
