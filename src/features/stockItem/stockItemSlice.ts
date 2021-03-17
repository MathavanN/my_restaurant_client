import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { IStockItem } from "model/stockItem.model";

interface StockITemState {
    stockItem: IStockItem | null;
    stockItemRegistry: { key: number, value: IStockItem }[] | [];
}
const initialState: StockITemState = {
    stockItem: null,
    stockItemRegistry: []
}

export const stockItemSlice = createSlice({
    name: "stockItem",
    initialState,
    reducers: {
        setStockItem: (state, action: PayloadAction<IStockItem>) => {
            state.stockItem = action.payload
        },
        setStockItems: (state, action: PayloadAction<IStockItem[]>) => {
            state.stockItemRegistry = action.payload.map((item, i) => {
                return {
                    key: ++i,
                    value: item
                }
            })
        }
    }
});

export const { setStockItem, setStockItems } = stockItemSlice.actions

export const fetchStockItemAsync = (id: number): AppThunk => async dispatch => {
    try {
        const response = await agent.StockItem.detail(id);
        dispatch(setStockItem(response))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchStockItemsAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.StockItem.listAll();
        dispatch(setStockItems(response))
    } catch (error) {
        console.log(error);
    }
}

export const getStockItems = (state: RootState) => state.stockItem.stockItemRegistry

export default stockItemSlice.reducer;