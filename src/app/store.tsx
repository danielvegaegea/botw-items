import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import compendiumReducer from '../features/hyruleCompendium/hyruleCompendiumSlice';
import compendiumMasterReducer from '../features/hyruleCompendiumMaster/hyruleCompendiumMasterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    compendium: compendiumReducer,
    compendiumMaster: compendiumMasterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
