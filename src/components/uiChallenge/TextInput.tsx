/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type TextInputProps = {
  type?: 'text' | 'password';
  name: string;
  value: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export default function TextInput({
  type = 'text',
  name,
  value,
  label,
  disabled = false,
  placeholder,
  description,
  onChange,
  onKeyDown,
}: TextInputProps) {
  return (
    <div css={ContainerCss}>
      {label && <span css={labelCss}>{label}</span>}
      <input
        css={inputCss(disabled, !!description)}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {description && <span css={descriptionCss}>{description}</span>}
    </div>
  );
}

const ContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const labelCss = css`
  width: 100%;
  margin-left: 8px;
  color: grey;
`;

const inputCss = (disabled: boolean, hasDescription: boolean) => css`
  width: 280px;
  height: 40px;
  padding: 0 8px;
  border: 1px solid ${hasDescription ? 'red' : 'grey'};
  border-radius: 8px;
  color: ${disabled ? 'grey' : 'black'};
  font-size: 16px;
`;

const descriptionCss = css`
  width: 100%;
  color: red;
`;
