import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { IStockItem, IStockItemEnvelop } from "model/stockItem.model";

interface StockITemState {
    stockItem: IStockItem | null;
    stockItemRegistry: { key: number, value: IStockItem }[] | [];
    stockItemCount: number;
    loading: boolean;
}
const initialState: StockITemState = {
    stockItem: null,
    stockItemRegistry: [],
    stockItemCount: 0,
    loading: false
}

export const stockItemSlice = createSlice({
    name: "stockItem",
    initialState,
    reducers: {
        setStockItem: (state, action: PayloadAction<IStockItem>) => {
            state.stockItem = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setStockItems: (state, action: PayloadAction<IStockItemEnvelop>) => {
            state.stockItemCount = action.payload.stockItemCount;
            state.stockItemRegistry = [];
            state.stockItemRegistry = action.payload.stockItems.map((item, i) => {
                return {
                    key: ++i,
                    value: item
                }
            })
        }
    }
});

export const { setStockItem, setStockItems, setLoading } = stockItemSlice.actions

export const fetchStockItemAsync = (id: number): AppThunk => async dispatch => {
    try {
        const response = await agent.StockItem.detail(id);
        dispatch(setStockItem(response))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchStockItemsAsync = (typeId: number, limit: number, page: number): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    try {
        const params = new URLSearchParams();
        params.append('limit', String(limit));
        params.append('offset', String(page))

        const response = await agent.StockItem.list(typeId, params);
        dispatch(setStockItems(response))
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
}

export const getStockItems = (state: RootState) => state.stockItem.stockItemRegistry
export const getStockItemCount = (state: RootState) => state.stockItem.stockItemCount
export const getStockItemLoading = (state: RootState) => state.stockItem.loading

export default stockItemSlice.reducer;