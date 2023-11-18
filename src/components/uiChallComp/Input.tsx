/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export type InputType = 'text' | 'password';

interface InputProps {
  id: string;
  type: InputType;
  label: string;
  placeHolder?: string;
  message?: string;
  inputError: boolean;
  handleKeyDown: (e: any) => void;
  handleGetValue: (e: any) => void;
}

export default function Input({
  id,
  type,
  label,
  placeHolder,
  message,
  inputError,
  handleKeyDown,
  handleGetValue,
}: InputProps) {
  return (
    <div css={inputWrapCss}>
      <label css={labelCss} htmlFor={id}>
        {label}
      </label>
      <input
        css={inputCss(inputError)}
        type={type}
        id={id}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onChange={handleGetValue}
      />
      {message !== '' && <p>{message}</p>}
    </div>
  );
}

const inputWrapCss = css`
  margin: 10px;
`;

const labelCss = css`
  display: block;
  margin-bottom: 8px;
`;

const inputCss = (inputError: boolean) => css`
  font-size: 16px;
  padding: 7px;
  border: 1px solid ${inputError ? 'red' : '#555'};
  outline: none;
`;
