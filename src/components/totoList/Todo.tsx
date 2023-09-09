/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from './Button';
import { BsCheck2Circle } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useState } from 'react';

interface TodoProps {
  id: string;
  text: string;
  done: boolean;
  onClickDone?: React.MouseEventHandler;
  onClickDelete?: React.MouseEventHandler;
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
    <div css={TodoCss} onClick={handleClickTodo}>
      <div css={textCss(done)}>{text}</div>
      {isShow && (
        <div css={buttonWrapperCss}>
          <Button
            backgroundColor="#0adc06"
            width="50px"
            height="50px"
            onClick={onClickDone}
          >
            <BsCheck2Circle size={24} />
          </Button>
          <Button
            backgroundColor="#f0302a"
            width="50px"
            height="50px"
            onClick={onClickDelete}
          >
            <RiDeleteBin5Fill size={24} />
          </Button>
        </div>
      )}
      {/* {isShow ? (
        <div css={buttonWrapperCss}>
          <Button
            backgroundColor="#0adc06"
            width="50px"
            height="50px"
            onClick={onClickDone}
          >
            <BsCheck2Circle size={24} />
          </Button>
          <Button
            backgroundColor="#f0302a"
            width="50px"
            height="50px"
            onClick={onClickDelete}
          >
            <RiDeleteBin5Fill size={24} />
          </Button>
        </div>
      ) : null} */}
    </div>
  );
}

const TodoCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  background-color: #edecec;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const textCss = (done: boolean) => css`
  padding: 0px 15px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  text-decoration: ${done ? 'line-through' : 'none'};
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 5px;
`;
