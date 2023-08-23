/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

import { useState, useEffect } from 'react';
import { TodoList } from '../types/Todo.type';
import Todo from '../components/todo';

export default function TodoListPage() {
  const [list, setList] = useState<TodoList>([
    { id: '1', text: 'react 복습', done: false },
    { id: '2', text: 'react 복습', done: false },
    { id: '3', text: 'react 복습', done: false },
  ]);

  useEffect(() => {
    // 총 개수의 초기 값
    setTaskNum(list.length);
  });

  const [userInput, setUserInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClickAddBtn = () => {
    setList(prev => [
      ...prev,
      {
        id: prev.length === 0 ? '1' : String(+prev[prev.length - 1].id + 1),
        text: userInput,
        done: false,
      },
    ]);
    setUserInput('');

    // 일단 플러스 버튼을 누르면 배열의 길이 + 1 해서 갯수를 구한다.
    setTaskNum(list.length + 1);
  };

  const [taskNum, setTaskNum] = useState(0);

  const handleClickClearBtn = () => {
    setList([]);
    setTaskNum(0);
  };

  const [deleteOn, setDeleteOn] = useState(false);

  const handleClickDeleteBtnOn = () => {
    deleteOn ? setDeleteOn(false) : setDeleteOn(true);
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
              onInput={handleChangeInput}
              css={inputCss}
              placeholder="Add your new todo"
            />
          </label>
          <button css={plusBtnCss} onClick={handleClickAddBtn}>
            <AiOutlinePlus />
          </button>
        </div>

        {/* 리스트 */}
        <ul css={listWrapCss}>
          {list.map(({ id, text, done }, i) => (
            <div key={id} css={todoElemCss} onClick={handleClickDeleteBtnOn}>
              <Todo id={id} text={text} done={done}></Todo>

              <button
                css={deleteCss}
                onClick={() => {
                  let listcopy = [...list];
                  listcopy.splice(i, 1);
                  setList(listcopy);

                  // 버튼을 누르면 총 갯수에서 -1 한다.
                  setTaskNum(list.length - 1);
                }}
              >
                <BsFillTrashFill />
              </button>
            </div>
          ))}
        </ul>

        {/* 하단 글 갯수, 클리어 버튼 */}
        <div css={clearBtnWrapCss}>
          <p>You have {taskNum} pending tasks</p>
          <button css={clearBtnCss} onClick={handleClickClearBtn}>
            Clear All
          </button>
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
const plusBtnCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  background-color: var(--primary-color);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
`;
const clearBtnCss = css`
  padding: 10px;
  background-color: var(--primary-color);
  color: #fff;
`;

const todoElemCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const deleteCss = css`
  font-size: 20px;
  background: #db5252;
  color: #fff;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  right: 0;
`;
