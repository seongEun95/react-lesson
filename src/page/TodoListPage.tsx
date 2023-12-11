/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { TodoData, TodoList } from '../types/Todo.type';
import Todo from '../components/todoList/todo';
import Button from '../components/todoList/button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setList,
  updateTodo,
  deleteTodo,
  toggleDone,
  addTodoList,
} from '../redux/slice/todoListSlice';
import {
  confirmModal,
  contentChangeModal,
  showModal,
  titleChangeModal,
  resetModal,
} from '../redux/slice/modalSlice';

// interface TodoFromServer {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

export default function TodoListPage() {
  const [userInput, setUserInput] = useState(''); // 유저의 입력 상태
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.todoList);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value); // 사용자가 입력한 값으로 상태를 변경한다.
  };

  const getData = () => {
    const token = localStorage.getItem('ac');

    axios
      .get<{ message: string; result: TodoList }>('/todo', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          const newData = res.data.result.map(
            ({ id, text, done, created_at }) => {
              return {
                id: String(id),
                text,
                done,
                created_at: new Date(created_at),
              };
            },
          );
          dispatch(setList(newData));
        }
      })
      .catch(err => {
        console.dir(err.code);

        if (err.code === 'ERR_NETWORK') {
          setTimeout(() => {
            getData();
          }, 3000);
        }
      });
  };

  // useEffect , 두 번째 파라미터 빈배열 시 컴포넌트가 처음 렌더링 될 때 실행
  useEffect(() => {
    getData();

    return () => {
      // unmount 시,컴포넌트가 사라질 때 실행, 페이지 전환 시 모달 안 보이도록
      dispatch(showModal(false));
    };
  }, []);

  // 투두 추가 함수
  const addTodo = () => {
    if (userInput === '') {
      return;
    }

    const body = { text: userInput };
    const token = localStorage.getItem('ac');

    axios //
      .post<{ message: string; result: TodoData }>('/todo', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(addTodoList(res.data.result));
          setUserInput(''); // 플러스 버튼을 눌렀을 때 인풋박스 안의 내용 초기화
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 엔터키 눌러도 투두에 추가 함수
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTodo();
    } // 엔터키를 눌렀을 때 투두 추가 함수 실행
  };

  // 완료 함수
  const handleClickDone = ({ id, text, done, created_at }: TodoData) => {
    const token = localStorage.getItem('ac');
    axios //
      .patch<{ message: string; result: TodoData }>(
        `/todo/${id}`,
        { done: !done },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(updateTodo({ id, text, done: !done, created_at }));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 삭제 함수
  const handleClickDelete = (id: string) => {
    const token = localStorage.getItem('ac');

    axios //
      .delete<{ message: string; result: TodoData }>(`/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(deleteTodo(id));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 초기화 함수
  const handleClickClearBtn = () => {
    const token = localStorage.getItem('ac');

    axios //
      .delete<{ message: string }>('/todo/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.message === 'SUCCESS') {
          dispatch(
            confirmModal(() => {
              dispatch(setList([]));
              dispatch(showModal(false));
            }),
          ); // 초기화 버튼을 눌렀을 때 리스트의 상태는 빈배열로 상태 변경
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        // dispatch(resetModal()); // 23.12.02 켜지자마자 종료되는 에러 발생
      });

    dispatch(titleChangeModal('정말 삭제?'));
    dispatch(contentChangeModal('정말 다 삭제하시겠습니까?'));
    dispatch(showModal(true));
  };

  return (
    <div css={TodoListCss}>
      <div css={todoWrapCss}>
        <h1>Todo App</h1>
        {/* 버튼 작성란 */}
        <div css={txtInputWrapCss}>
          <label htmlFor="">
            <input
              type="text"
              value={userInput}
              onChange={handleChangeInput}
              onKeyDown={handleKeyDownEnter}
              css={inputCss}
              placeholder="Add your new todo"
            />
          </label>
          <Button
            onClick={addTodo}
            width="50px"
            height="50px"
            backgroundColor="#b873cb"
          >
            <AiOutlinePlus size={20} />
          </Button>
        </div>

        {/* 리스트 */}
        <ul css={listWrapCss}>
          {list.map(({ id, text, done, created_at }: TodoData) => (
            <Todo
              key={id}
              id={id}
              text={text}
              done={done}
              onClickDone={() =>
                handleClickDone({ id, text, done, created_at })
              }
              onClickDelete={() => handleClickDelete(id)}
            ></Todo>
          ))}
        </ul>

        {/* 하단 글 갯수, 클리어 버튼 */}
        <div css={clearBtnWrapCss}>
          <p>You have {list.length} pending tasks</p>
          <Button
            backgroundColor="#b873cb"
            width="70px"
            height="40px"
            onClick={handleClickClearBtn}
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
  height: calc(100% - 96px);
`;

const todoWrapCss = css`
  padding: 30px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const txtInputWrapCss = css`
  display: flex;
  label {
    width: calc(100% - 50px);
  }
`;
const inputCss = css`
  height: 50px;
  width: calc(98%);
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
    padding-left: 10px;
    color: #aaa;
  }
`;
const listWrapCss = css``;
const clearBtnWrapCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  p {
    font-size: 18px;
    color: #333;
  }
`;
