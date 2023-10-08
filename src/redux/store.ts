import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import todoListSlice from './slice/todoListSlice';
import modal from './slice/modalSlice';

const middlewares = [];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = configureStore({
  reducer: {
    todoList: todoListSlice,
    modal: modal,
  },
  middleware: middlewares,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
