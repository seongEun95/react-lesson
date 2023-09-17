/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface ButtonProps {
  children: React.ReactNode;
  backgroundColor: string;
  width?: string;
  height?: string;
  onClick?: React.MouseEventHandler;
}

export default function Button({
  children,
  backgroundColor,
  width = 'fit-content',
  height = 'fit-content',
  onClick,
}: ButtonProps) {
  return (
    <button css={ButtonCss(width, height, backgroundColor)} onClick={onClick}>
      {children}
    </button>
  );
}

const ButtonCss = (
  width: string,
  height: string,
  backgrounColor: string,
) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: ${height};
  background-color: ${backgrounColor};
  border: none;
  cursor: pointer;
  color: #fff;

  &:hover {
    opacity: 0.5;
  }
`;
