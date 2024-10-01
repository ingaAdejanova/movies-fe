import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { moviesSlice } from '../movieSlice';

const rootReducer = combineSlices(moviesSlice)

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>