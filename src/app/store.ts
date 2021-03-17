import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'
import todosReducer from '../features/todo/todoSlice'
import userReducer from '../features/user/userSlice'
import unitOfMeasureReducer from '../features/unitOfMeasure/unitOfMeasureSlice'
import stockTypeReducer from '../features/stockType/stockTypeSlice'
import stockItemReducer from '../features/stockItem/stockItemSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        unitOfMeasure: unitOfMeasureReducer,
        stockType: stockTypeReducer,
        stockItem: stockItemReducer,
        counter: counterReducer,
        todos: todosReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;