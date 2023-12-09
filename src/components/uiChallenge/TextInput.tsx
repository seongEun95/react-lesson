/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export type InputType = 'text' | 'password';

interface InputProps {
  id: string;
  name: string;
  value: string;
  type: InputType;
  label?: string;
  disabled?: boolean;
  placeHolder?: string;
  message?: string;
  // inputError: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  id,
  name,
  value,
  type = 'text',
  label,
  disabled = false,
  placeHolder,
  message = '',
  // inputError,
  onKeyDown,
  onChange,
}: InputProps) {
  return (
    <div css={inputWrapCss}>
      <label css={labelCss} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        css={inputCss(message)}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        placeholder={placeHolder}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      {message && <p>{message}</p>}
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

const inputCss = (message: string) => css`
  font-size: 16px;
  padding: 7px;
  border: 1px solid ${message ? 'red' : '#555'};
  outline: none;
`;
