import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { ITodo } from "model/Todo.model";
import agent from "../../api/agent"

type TodosState = {
    status: "loading" | "idle";
    error: string | null;
    list: ITodo[]
};

const initialState = {
    list: [],
    error: null,
    status: "idle"
} as TodosState;

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.list.push(action.payload);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const index = state.list.findIndex(({ id }) => id === action.payload);
            if (index)
                state.list[index].completed = !state.list[index].completed
        },
        loadTodos: (state, action: PayloadAction<ITodo[]>) => {
            state.list = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, loadTodos } = todosSlice.actions;

export const fetchTodoAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.Todo.list();
        dispatch(loadTodos(response))

    } catch (error) {
        console.log(error)
    }
}

export const selectTodos = (state: RootState) => state.todos.list;
export const selectStatus = (state: RootState) => state.todos.status;
export default todosSlice.reducer;