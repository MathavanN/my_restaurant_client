import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { ISelectInputOptions } from "model/Common.model";
import { IStockType } from "model/StockType.model";

interface StockTypeState {
    stockType: IStockType | null;
    stockTypeRegistry: { key: number, value: IStockType }[] | [];
    loading: boolean;
}
const initialState: StockTypeState = {
    stockType: null,
    stockTypeRegistry: [],
    loading: false
}

export const stockTypeSlice = createSlice({
    name: "stockType",
    initialState,
    reducers: {
        setStockType: (state, action: PayloadAction<IStockType>) => {
            state.stockType = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
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

export const { setStockType, setStockTypes, setLoading } = stockTypeSlice.actions

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
    dispatch(setLoading(true));
    try {
        const response = await agent.StockType.list();
        dispatch(setStockTypes(response))
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
}

export const getStockTypes = (state: RootState) => state.stockType.stockTypeRegistry;
export const getStockTypeLoading = (state: RootState) => state.stockType.loading
export const getStockTypeOptions = (state: RootState) => {
    return state.stockType.stockTypeRegistry.map((stockType: { key: number, value: IStockType }) => {
        return {
            key: stockType.value.id,
            text: stockType.value.type,
            value: stockType.value.id,
        } as ISelectInputOptions;
    })
}

export default stockTypeSlice.reducer;