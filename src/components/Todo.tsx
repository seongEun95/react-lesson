/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface TodoProps {
  id: string;
  text: string;
  done: boolean;
}

export default function Todo({ id, text, done }: TodoProps) {
  return (
    <div css={TodoCss}>
      <div css={textCss}>{text}</div>
      <div css={buttonWrapperCss}>
        <button>done</button>
        <button>delete</button>
      </div>
    </div>
  );
}

const TodoCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #edecec;
`;

const textCss = css`
  margin-left: 15px;
  font-size: 18px;
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 10px;
`;
