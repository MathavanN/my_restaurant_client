import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { IStockType } from "model/StockType.model";

interface StockTypeState {
    stockType: IStockType | null;
    stockTypeRegistry: { key: number, value: IStockType }[] | [];
}
const initialState: StockTypeState = {
    stockType: null,
    stockTypeRegistry: []
}

export const stockTypeSlice = createSlice({
    name: "stockType",
    initialState,
    reducers: {
        setStockType: (state, action: PayloadAction<IStockType>) => {
            state.stockType = action.payload
        },
        setStockTypes: (state, action: PayloadAction<IStockType[]>) => {
            state.stockTypeRegistry = action.payload.map((item, i) => {
                return {
                    key: ++i,
                    value: item
                }
            })
        }
    }
});

export const { setStockType, setStockTypes } = stockTypeSlice.actions

export const fetchStockTypeAsync = (id: number): AppThunk => async dispatch => {
    try {
        const response = await agent.StockType.detail(id);
        dispatch(setStockType(response))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchStockTypesAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.StockType.list();
        dispatch(setStockTypes(response))
    } catch (error) {
        console.log(error);
    }
}

export const getStockTypes = (state: RootState) => state.stockType.stockTypeRegistry;

export default stockTypeSlice.reducer;