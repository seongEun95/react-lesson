/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

import { useState, useEffect } from 'react';
import { TodoList } from '../types/Todo.type';
import Todo from '../components/todo';
import Button from '../components/button';
import axios from 'axios';

export default function TodoListPage() {
  const [userInput, setUserInput] = useState(''); // 유저의 입력 상태

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserInput(e.target.value); // 사용자가 입력한 값으로 상태를 변경한다.
  };

  // 투두리스트의 목록 배열
  const [list, setList] = useState<TodoList>([]);

  interface TodoFromServer {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  // const getData = () => {
  //   fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //     .then(res => res.json())
  //     .then(data => {
  //       const newData = data.map(({ id, title, completed }: TodoFromServer) => {
  //         return {
  //           id: String(id), // 받아온 데이터의 아이디는 숫자이므로 문자로 형변환
  //           text: title,
  //           done: completed,
  //         };
  //       });
  //       setList(newData);

  //       throw new Error('error 발생');
  //     })
  //     .catch(err => {
  //       console.dir(err);
  //     });
  // };

  const getData = () => {
    axios
      .get<TodoFromServer[]>(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
      )
      .then(res => {
        const newData = res.data.map(({ id, title, completed }) => {
          return {
            id: String(id),
            text: title,
            done: completed,
          };
        });

        setList(newData);

        throw new Error('에러발생');
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
  }, []);

  // 투두 추가 함수
  const addTodo = () => {
    if (userInput === '') {
      return;
    }
    setList(prev => [
      ...prev,
      {
        // id: list.length === 0 ? '1' : String(+prev[prev.length - 1].id + 1),
        id: String(list.length === 0 ? 1 : +prev[prev.length - 1].id + 1),
        text: userInput,
        done: false,
      },
    ]);

    setUserInput(''); // 플러스 버튼을 눌렀을 때 인풋박스 안의 내용 초기화
  };

  // 엔터키 눌러도 투두에 추가 함수
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTodo();
    } // 엔터키를 눌렀을 때 투두 추가 함수 실행
  };

  // 완료 함수
  const handleClickDone = (id: string) => {
    setList(prev =>
      prev.map(todo => ({
        ...todo, // spread 연산자를 사용하여 배열 해체
        done: todo.id === id ? !todo.done : todo.done, // done은 객체의 id와 파라미터로 받은 id가 같으면 부정연산자로 인해 true 다르면 false
      })),
    );
  };

  // 삭제 함수
  const handleClickDelete = (id: string) => {
    // setList 상태 변경 함수 사용하여 prev로 이전 상태를 받아 filter함수로 기존 객체의 id와
    setList(prev => prev.filter(todo => todo.id !== id));
  };

  // 초기화 함수
  const handleClickClearBtn = () => {
    setList([]); // 초기화 버튼을 눌렀을 때 리스트의 상태는 빈배열로 상태 변경
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
          {list.map(({ id, text, done }) => (
            <Todo
              key={id}
              id={id}
              text={text}
              done={done}
              onClickDone={() => handleClickDone(id)}
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
