import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { IUnitOfMeasure } from '../../model/UnitOfMeasure.model';
import type { AppThunk, RootState } from '../../store';

interface UnitOfMeasureState {
  unitOfMeasureRegistry: { key: number, value: IUnitOfMeasure }[] | []
}
const initialState: UnitOfMeasureState = {
  unitOfMeasureRegistry: []
}
export const unitOfMeasureSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUnitOfMeasures: (state, action: PayloadAction<IUnitOfMeasure[]>) => {
      state.unitOfMeasureRegistry = action.payload.map((item, i) => {
        const idex = i;
        return ({ key: idex + 1, value: item })
      })
    },
  },
});

export const { setUnitOfMeasures } = unitOfMeasureSlice.actions;

export const fetchUnitOfMeasuresAsync = (): AppThunk => async (dispatch) => {
  try {
    const result = await agent.UnitOfMeasure.list();
    dispatch(setUnitOfMeasures(result));
  } catch (error) {
    dispatch(setUnitOfMeasures([]));
    throw error;
  }
}

export const getUnitOfMeasures = (state: RootState) => state.unitOfMeasure.unitOfMeasureRegistry;
export default unitOfMeasureSlice.reducer;