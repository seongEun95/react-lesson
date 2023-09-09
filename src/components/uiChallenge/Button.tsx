/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  type = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      css={[
        buttonCss,
        getCssByType(type),
        getCssBySize(size),
        disabled && disabledCss,
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const buttonCss = css`
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const disabledCss = css`
  opacity: 0.3;
  cursor: not-allowed;

  &:hover {
    opacity: 0.3;
  }
`;

// type
const getCssByType = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return primaryCss;
    case 'secondary':
      return secondaryCss;
    case 'tertiary':
      return tertiaryCss;
    case 'danger':
      return dangerCss;
    case 'ghost':
      return ghostCss;
    default:
      return primaryCss;
  }
};

const primaryCss = css`
  background-color: #1e62fe;
  color: white;
`;

const secondaryCss = css`
  background-color: #393939;
  color: white;
`;

const tertiaryCss = css`
  background-color: white;
  color: #1e62fe;
`;

const dangerCss = css`
  background-color: #da1e28;
  color: white;
`;

const ghostCss = css`
  background-color: transparent;
  color: #1e62fe;
`;

// size
const getCssBySize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return smallCss;
    case 'medium':
      return mediumCss;
    case 'large':
      return largeCss;
    default:
      return mediumCss;
  }
};

const smallCss = css`
  font-size: 12px;
  padding: 8px 16px;
  min-width: 50px;
`;

const mediumCss = css`
  font-size: 14px;
  padding: 12px 20px;
  min-width: 100px;
`;

const largeCss = css`
  font-size: 16px;
  padding: 16px 24px;
  min-width: 150px;
`;
