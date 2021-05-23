import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { IStockItem } from '../../model/StockItem.model';
import type { AppThunk, RootState } from '../../store';

interface IStockItemState {
  stockItemRegistry: { key: number, value: IStockItem }[] | []
}
const initialState: IStockItemState = {
  stockItemRegistry: []
}
export const stockItemSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStockItems: (state, action: PayloadAction<IStockItem[]>) => {
      state.stockItemRegistry = action.payload.map((item, i) => {
        const idex = i;
        return ({ key: idex + 1, value: item })
      })
    },
  },
});

export const { setStockItems } = stockItemSlice.actions;

export const fetchStockItemsAsync = (): AppThunk => async (dispatch) => {
  try {
    const result = await agent.StockItem.listAll();
    dispatch(setStockItems(result));
  } catch (error) {
    dispatch(setStockItems([]));
    throw error;
  }
}

export const getStockItems = (state: RootState) => state.stockItem.stockItemRegistry;
export default stockItemSlice.reducer;