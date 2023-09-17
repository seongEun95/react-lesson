/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import Button from './button';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

interface TodoProps {
  id: string;
  text: string;
  done: boolean;
  onClickDelete?: React.MouseEventHandler; // 부모 컴포넌트에서 props로 넘긴 함수
  onClickDone?: React.MouseEventHandler; // 부모 컴포넌트에서 props로 넘긴 함수
}

export default function Todo({
  id,
  text,
  done,
  onClickDone,
  onClickDelete,
}: TodoProps) {
  const [isShow, setIsShow] = useState(false);

  const handleClickTodo = () => {
    setIsShow(prev => !prev);
  };

  return (
    <li css={TodoCss} onClick={handleClickTodo}>
      <p css={textCss(done)}>{text}</p>
      {isShow && (
        <div css={buttonWrapperCss}>
          <Button
            backgroundColor="#85b784"
            width="50px"
            height="50px"
            onClick={onClickDone}
          >
            <AiOutlineCheckCircle size={20} />
          </Button>
          <Button
            backgroundColor="#b78484"
            width="50px"
            height="50px"
            onClick={onClickDelete}
          >
            <BsTrash size={18} />
          </Button>
        </div>
      )}
    </li>
  );
}

const TodoCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
  width: 100%;
  height: 50px;
  background-color: #f1f1f1;
  box-sizing: border-box;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
`;

const textCss = (done: boolean) => css`
  font-size: 14px;
  text-decoration: ${done ? 'line-through' : 'none'};
  color: ${done ? '#bbb' : '#333'};
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 8px;
`;
