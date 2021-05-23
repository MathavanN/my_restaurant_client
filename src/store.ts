import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import signInReducer from './features/signIn/signInSlice';
import unitOfMeasureReducer from './features/unitOfMeasure/unitOfMeasureSlice'

export const store = configureStore({
  reducer: {
    user: signInReducer,
    unitOfMeasure: unitOfMeasureReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
