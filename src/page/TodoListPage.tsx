/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { TodoData, TodoList } from '../types/Todo.type';
import Button from '../components/totoList/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoList,
  deleteTodo,
  setList,
  toggleDone,
  updateTodo,
} from '../redux/slice/todoListSlice';
import { RootState } from '../redux/store';
import Todo from '../components/totoList/Todo';
import {
  resetModal,
  setContentModal,
  setIsShowModal,
  setOnConfirmModal,
  setTitleModal,
} from '../redux/slice/layoutSilce';

// interface TodoFromServer {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

export default function TodoListPage() {
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.todoList);

  useEffect(() => {
    return () => {
      dispatch(resetModal());
    };
  }, []);

  const handleChnageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    axios
      .get<{ message: string; result: TodoList }>(
        'http://localhost:8000/todo',
        // 'https://jsonplaceholder.typicode.com/todos?_limit=j',
      )
      .then(res => {
        if ((res.data.message = 'SUCCESS')) {
          const newData = res.data.result.map(
            ({ id, text, done, created_at }) => ({
              id: String(id),
              text,
              done,
              created_at: new Date(created_at),
            }),
          );

          dispatch(setList(newData));
        }
      })
      .catch(console.error);
  }, []);

  const addTodo = () => {
    const body = { text: userInput };

    axios
      .post<{ message: string; result: TodoData }>(
        'http://localhost:8000/todo',
        body,
      )
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(addTodoList(res.data.result));
          setUserInput('');
        }
      })
      .catch(err => console.error(err));
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
      addTodo();
    }
  };

  const handleClickDelete = (id: string) => {
    axios
      .delete<{ message: string }>(`http://localhost:8000/todo/${id}`)
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(deleteTodo(id));
        }
      })
      .catch(err => console.error(err));
  };

  const handleClickDone = ({ id, text, done, created_at }: TodoData) => {
    axios
      .patch<{ message: string; result: TodoData }>(
        `http://localhost:8000/todo/${id}`,
        { done: !done },
      )
      .then(res => {
        if ((res.data.message = 'SUCCESS')) {
          dispatch(updateTodo({ id, text, done: !done, created_at }));
        }
      })
      .catch(err => console.error(err));
  };

  const handleClickClear = () => {
    dispatch(
      setOnConfirmModal(() => {
        axios
          .delete<{ message: string }>('http://localhost:8000/todo/all')
          .then(res => {
            if (res.data.message === 'SUCCESS') {
              dispatch(setList([]));
            }
          })
          .catch(err => console.error(err))
          .finally(() => {
            dispatch(resetModal());
          });
      }),
    );
    dispatch(setTitleModal('Todo List'));
    dispatch(setContentModal('정말로 모두 삭제하시겠습니까?'));
    dispatch(setIsShowModal(true));
  };

  return (
    <div css={TodoListCss}>
      <div css={containerCss}>
        <div css={headerCss}>
          <div css={headerTextCss}>Todo List</div>
        </div>
        <div css={bodyCss}>
          <div css={inputWrapperCss}>
            <input
              css={inputCss}
              name="text"
              value={userInput}
              onChange={handleChnageInput}
              onKeyDown={handleKeyDownEnter}
            />
            <Button
              backgroundColor="#9a3cf9"
              width="40px"
              height="40px"
              onClick={addTodo}
            >
              <AiOutlinePlus size={24} />
            </Button>
          </div>
          <div css={todoListWrapperCss}>
            {list.map(({ id, text, done }) => (
              <Todo
                key={id}
                id={id}
                text={text}
                done={done}
                onClickDone={() => handleClickDone({ id, text, done })}
                onClickDelete={() => handleClickDelete(id)}
              />
            ))}
          </div>
        </div>
        <div css={footerCss}>
          <div>{`You have ${list.length} pending tasks`}</div>
          <Button
            backgroundColor="#9a3cf9"
            height="30px"
            onClick={handleClickClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

const TodoListCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;

const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 400px;
  padding: 20px 15px;

  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
`;

const headerCss = css`
  width: 100%;
`;

const headerTextCss = css`
  font-size: 24px;
  font-weight: bold;
`;

const bodyCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const todoListWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: fit-content;
  max-height: 400px;
  overflow-y: overlay;

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: lightgrey;
    }
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 15px;
    border: 3px solid white; // 배경색과 같은 색으로 설정
    min-height: 50px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: lightgrey transparent;
  }
`;

const inputWrapperCss = css`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const inputCss = css`
  flex: 1;
`;

const footerCss = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
