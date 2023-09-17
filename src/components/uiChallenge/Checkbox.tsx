/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { BiCheck } from 'react-icons/bi';

interface CheckboxProps {
  name: string;
  checked: boolean;
  label?: string;
  id?: string;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Checkbox({
  checked,
  id,
  label,
  name,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const realId = id || name;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && e.key === 'Enter') {
      //@ts-ignore
      e.target.checked = !checked;
      //@ts-ignore
      e.target.name = name;
      console.dir(e.target);
      onChange(e as any);
    }
  };

  return (
    <label css={[CheckboxCss, disabled && disabledCss]} htmlFor={realId}>
      <input
        css={inputCss}
        id={realId}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <div
        css={boxCss(checked)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
      >
        {checked && <BiCheck css={checkIconCss} size={20} />}
      </div>
      <span css={labelCss}>{label}</span>
    </label>
  );
}

const CheckboxCss = css`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const disabledCss = css`
  cursor: not-allowed;
  opacity: 0.5;
`;

const inputCss = css`
  display: none;
`;

const boxCss = (checked: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid #707070;
  border-radius: 2px;
  background-color: ${checked ? 'black' : 'white'};

  &:focus {
    outline: 1px solid #1e62fe;
  }
`;

const checkIconCss = css`
  color: white;
`;

const labelCss = css`
  margin-top: 2px;
`;
