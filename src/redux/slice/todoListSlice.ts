import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoData, TodoList } from '../../types/Todo.type';

interface TodoListState {
  list: TodoList;
}

const initialState: TodoListState = {
  list: [],
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<TodoList>) {
      state.list = action.payload;
    },

    addTodoList(state, action: PayloadAction<Omit<TodoData, 'id'>>) {
      state.list.push({
        ...action.payload,
        id: String(
          state.list.length === 0
            ? 1
            : +state.list[state.list.length - 1].id + 1,
        ),
      });
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },

    updateTodo(state, action: PayloadAction<TodoData>) {
      state.list = state.list.map(todo =>
        todo.id === String(action.payload.id) ? action.payload : todo,
      );
    },

    toggleDone(state, action: PayloadAction<string>) {
      state.list = state.list.map(todo => ({
        ...todo,
        done: action.payload === todo.id ? !todo.done : todo.done,
      }));
    },
  },
});

export const { setList, addTodoList, updateTodo, deleteTodo, toggleDone } =
  todoListSlice.actions;
export default todoListSlice.reducer;
