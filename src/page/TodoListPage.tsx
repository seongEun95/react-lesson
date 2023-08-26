/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { TodoList } from '../types/Todo.type';
import Todo from '../components/Todo';

export default function TodoListPage() {
  const [list, setList] = useState<TodoList>([
    { id: '1', text: 'react 복습', done: false },
    { id: '2', text: 'react 복습', done: false },
    { id: '3', text: 'react 복습', done: false },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleChnageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClickAddButton = () => {
    setList(prev => [
      ...prev,
      {
        id: String(+prev[prev.length - 1].id + 1),
        text: userInput,
        done: false,
      },
    ]);

    setUserInput('');
  };

  console.log(list);

  return (
    <div css={TodoListCss}>
      <div css={containerCss}>
        <div css={headerCss}>
          <div>Todo List</div>
        </div>
        <div css={bodyCss}>
          <div css={inputWrapperCss}>
            <input
              css={inputCss}
              name="text"
              value={userInput}
              onChange={handleChnageInput}
            />
            <button onClick={handleClickAddButton}>+</button>
          </div>
          <div css={todoListWrapperCss}>
            {list.map(({ id, text, done }) => (
              <Todo key={id} id={id} text={text} done={done} />
            ))}
            {/* {list.map(todo => (
              <Todo key={todo.id} {...todo} />
            ))} */}
          </div>
        </div>
        <div css={footerCss}>
          <div>{`You have ${list.length} pending tasks`}</div>
          <button>clear</button>
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

  & div {
    font-size: 24px;
    font-weight: bold;
  }
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
