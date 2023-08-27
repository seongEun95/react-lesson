import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './page/HomePage';
import TodoListPage from './page/TodoListPage';
import NestingPage from './page/NestingPage';
import ChildrenPage from './page/ChildrenPage';
import NotFoundPage from './page/DraftPage';
import DraftPage from './page/DraftPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todoList" element={<TodoListPage />} />
        <Route path="/nesting" element={<NestingPage />}>
          <Route path="children/:id" element={<ChildrenPage />} />
        </Route>
        <Route path="/draft" element={<DraftPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}