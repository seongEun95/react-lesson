/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

interface TodoProps {
  id: string;
  text: string;
  done: boolean;
}

export default function Todo({ id, text, done }: TodoProps) {
  return (
    <li css={TodoCss}>
      <p css={textCss}>{text}</p>
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
`;

const textCss = css`
  font-size: 14px;
  color: #333;
  font-size: 18px;
  color: #000;
`;
