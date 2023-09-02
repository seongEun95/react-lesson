/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { TodoList } from '../types/Todo.type';
import Todo from '../components/Todo';
import Button from '../components/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoListPage() {
  const [userInput, setUserInput] = useState('');

  const handleChnageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const [list, setList] = useState<TodoList>([]);

  const getData = () => {
    axios
      .get<TodoFromServer[]>(
        'https://jsonplaceholder.typicode.com/todos?_limit=10',
      )
      .then(res => {
        // console.log(res.data);
        const newData = res.data.map(({ id, title, completed }) => ({
          id: String(id),
          text: title,
          done: completed,
        }));

        // console.log(newData);
        setList(newData);

        throw new Error('에러 발생!');
      })
      .catch(err => {
        console.error(err);

        if (err.code === 'ERR_NETWORK')
          setTimeout(() => {
            getData();
          }, 3000);
      });
  };

  useEffect(() => {
    getData();
    // axios
    //   .get<TodoFromServer[]>(
    //     'https://jsonplaceholder.typicode.com/todos?_limit=10',
    //   )
    //   .then(res => {
    //     // console.log(res.data);
    //     const newData = res.data.map(({ id, title, completed }) => ({
    //       id: String(id),
    //       text: title,
    //       done: completed,
    //     }));

    //     // console.log(newData);
    //     setList(newData);

    //     throw new Error('네트워크에러 발생!');
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });

    // fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    //   .then(res => res.json())
    //   .then((data: TodoFromServer[]) => {
    //     // console.log(data);
    //     const newData = data.map(({ id, title, completed }) => ({
    //       id: String(id),
    //       text: title,
    //       done: completed,
    //     }));
    //     // console.log(newData);
    //     setList(newData);
    //   });
  }, []);

  const addTodo = () => {
    setList(prev => [
      ...prev,
      {
        id: String(list.length === 0 ? 1 : +prev[prev.length - 1].id + 1),
        text: userInput,
        done: false,
      },
    ]);

    setUserInput('');
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') addTodo();
  };

  const handleClickDelete = (id: string) => {
    setList(prev => prev.filter(todo => todo.id !== id));
  };

  const handleClickDone = (id: string) => {
    setList(prev =>
      prev.map(todo => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done,
      })),
    );
  };

  const handleClickClear = () => {
    setList(() => []);
  };

  console.log(list);

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
                onClickDone={() => handleClickDone(id)}
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
