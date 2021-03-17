import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { IUnitOfMeasure } from "model/UnitOfMeasure.model";

interface UnitOfMeasureState {
    unitOfMeasure: IUnitOfMeasure | null;
    unitOfMeasureRegistry: { key: number, value: IUnitOfMeasure }[] | [];
}
const initialState: UnitOfMeasureState = {
    unitOfMeasure: null,
    unitOfMeasureRegistry: []
}

export const unitOfMeasureSlice = createSlice({
    name: "uom",
    initialState,
    reducers: {
        setUnitOfMeasure: (state, action: PayloadAction<IUnitOfMeasure>) => {
            state.unitOfMeasure = action.payload
        },
        setUnitOfMeasures: (state, action: PayloadAction<IUnitOfMeasure[]>) => {
            state.unitOfMeasureRegistry = action.payload.map((item, i) => {
                return {
                    key: ++i,
                    value: item
                }
            })
        }
    }
});

export const { setUnitOfMeasure, setUnitOfMeasures } = unitOfMeasureSlice.actions

export const fetchUnitOfMeasureAsync = (id: number): AppThunk => async dispatch => {
    try {
        const response = await agent.UOM.detail(id);
        dispatch(setUnitOfMeasure(response))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchUnitOfMeasuresAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.UOM.list();
        dispatch(setUnitOfMeasures(response))
    } catch (error) {
        console.log(error);
    }
}

export const getUnitOfMeasures = (state: RootState) => state.unitOfMeasure.unitOfMeasureRegistry;

export default unitOfMeasureSlice.reducer;