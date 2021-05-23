import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { IStockType } from '../../model/StockType.model';
import type { AppThunk, RootState } from '../../store';

interface IStockTypeState {
  stockTypeRegistry: { key: number, value: IStockType }[] | []
}
const initialState: IStockTypeState = {
  stockTypeRegistry: []
}
export const stockTypeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStockTypes: (state, action: PayloadAction<IStockType[]>) => {
      state.stockTypeRegistry = action.payload.map((item, i) => {
        const idex = i;
        return ({ key: idex + 1, value: item })
      })
    },
  },
});

export const { setStockTypes } = stockTypeSlice.actions;

export const fetchStockTypesAsync = (): AppThunk => async (dispatch) => {
  try {
    const result = await agent.StockType.list();
    dispatch(setStockTypes(result));
  } catch (error) {
    dispatch(setStockTypes([]));
    throw error;
  }
}

export const getStockTypes = (state: RootState) => state.stockType.stockTypeRegistry;
export default stockTypeSlice.reducer;