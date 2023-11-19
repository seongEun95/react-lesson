import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/HomePage';
import TodoListPage from './page/TodoListPage';
import NestingPage from './page/NestingPage';
import ChildrenPage from './page/ChildrenPage';
import NotFoundPage from './page/NotFoundPage';
import DraftPage from './page/DraftPage';
import UiChallengePage from './page/uiChallenge/UiChallengePage';
import ButtonPage from './page/uiChallenge/ButtonPage';
import CheckBoxPage from './page/uiChallenge/CheckBoxPage';
import ModalPage from './page/uiChallenge/ModalPage';
import HomeworkPage from './page/homework/HomeworkPage';
import { Modal } from './components/uiChallenge/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { showModal } from './redux/slice/modalSlice';
import StarbucksPage from './page/homework/StarbucksPage';
import StarbucksDetailpage from './page/homework/StarbucksDetailPage';
import DropdownPage from './page/uiChallenge/DropdownPage';
import LoginPage from './page/uiChallenge/loginPage';

export default function Router() {
  const dispatch = useDispatch();
  const { isShow, title, content, onConfirm } = useSelector(
    (state: RootState) => state.modal.modal,
  );

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
            <li>
              <Link to="/ui">ui challenge</Link>
            </li>
            <li>
              <Link to="/homework">숙제</Link>
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
        <Route path="/ui" element={<UiChallengePage />}>
          <Route path="button" element={<ButtonPage />} />
          <Route path="checkbox" element={<CheckBoxPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="dropdown" element={<DropdownPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/homework" element={<HomeworkPage />}>
          <Route path="starbucks" element={<StarbucksPage />} />
          <Route
            path="starbucksDetail/:drinkId"
            element={<StarbucksDetailpage />}
          />
        </Route>
      </Routes>

      <Modal
        isShow={isShow}
        modalTitle={title}
        onConfirm={onConfirm}
        onClose={() => dispatch(showModal(false))}
      >
        {content}
      </Modal>
    </BrowserRouter>
  );
}
