import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import agent from "../../api/agent"

export type TodoId = string;

export type Todo = {
    id: TodoId;
    title: string;
    completed: boolean
};


type TodosState = {
    status: "loading" | "idle";
    error: string | null;
    list: Todo[]
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
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.list.push(action.payload);
        },
        toggleTodo: (state, action: PayloadAction<TodoId>) => {
            const index = state.list.findIndex(({ id }) => id === action.payload);
            if (index)
                state.list[index].completed = !state.list[index].completed
        },
        loadTodos: (state, action: PayloadAction<Todo[]>) => {
            state.list = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, loadTodos } = todosSlice.actions;

export const fetchTodoAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.TodoAPI.list();
        dispatch(loadTodos(response))

    } catch (error) {
        console.log(error)
    }
}

export const selectTodos = (state: RootState) => state.todos.list;
export const selectStatus = (state: RootState) => state.todos.status;
export default todosSlice.reducer;