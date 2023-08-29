import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/HomePage';
import TodoListPage from './page/TodoListPage';
import NestingPage from './page/NestingPage';
import ChildrenPage from './page/ChildrenPage';
import NotFoundPage from './page/NotFoundPage';
import DraftPage from './page/DraftPage';

export default function Router() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">홈으로</Link>
            </li>
            <li>
              <Link to="/todoList">투두리스트 페이지</Link>
            </li>
            <li>
              <Link to="/nesting">네스팅 페이지</Link>
            </li>
            <li>
              <Link to="/nesting/children/1">자식 페이지1</Link>
            </li>
            <li>
              <Link to="/nesting/children/2">자식 페이지2</Link>
            </li>
            <li>
              <Link to="/nesting/children/3">자식 페이지3</Link>
            </li>
            <li>
              <Link to="/draft">초안 페이지</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todoList" element={<TodoListPage />} />
        <Route path="/nesting" element={<NestingPage />}>
          <Route path="children/:id" element={<ChildrenPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/draft" element={<DraftPage />} />
      </Routes>
    </BrowserRouter>
  );
}
