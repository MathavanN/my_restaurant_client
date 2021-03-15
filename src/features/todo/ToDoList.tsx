import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoAsync, selectTodos, toggleTodo } from "./todoSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  // useEffect(() => {
  //   dispatch(fetchTodoAsync());
  // }, [dispatch]);
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />{" "}
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
