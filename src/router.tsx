import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import HomePage from './page/HomePage';
import TodoListPage from './page/TodoListPage';
import NestingPage from './page/NestingPage';
import ChildrenPage from './page/ChildrenPage';
import NotFoundPage from './page/DraftPage';
import DraftPage from './page/DraftPage';
import ButtonPage from './page/ButtonPage';
import CheckboxPage from './page/CheckboxPage';
import ModalPage from './page/ModalPage';
import Modal from './components/uiChallenge/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { resetModal } from './redux/slice/layoutSilce';
import TextInputPage from './page/TextInputPage';

export default function Router() {
  const dispatch = useDispatch();
  const { isShow, content, title, onConfirm } = useSelector(
    (state: RootState) => state.layout.modal,
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/service" element={<Outlet />}>
          <Route path="todoList" element={<TodoListPage />} />
        </Route>

        <Route path="/uiChallenge" element={<Outlet />}>
          <Route path="button" element={<ButtonPage />} />
          <Route path="checkbox" element={<CheckboxPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="textInput" element={<TextInputPage />} />
        </Route>

        <Route path="/draft" element={<DraftPage />} />

        <Route path="/nesting" element={<NestingPage />}>
          <Route path="children/:id" element={<ChildrenPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Modal
        isShow={isShow}
        title={title}
        onConfirm={onConfirm}
        onClose={() => dispatch(resetModal())}
      >
        {content}
      </Modal>
    </BrowserRouter>
  );
}
