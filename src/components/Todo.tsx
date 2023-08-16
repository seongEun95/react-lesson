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
    </div>
  );
}

const TodoCss = css``;

const textCss = css``;
