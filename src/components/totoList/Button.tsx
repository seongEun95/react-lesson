/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

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
  backgroundColor: string,
) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: ${height};
  background-color: ${backgroundColor};
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.5;
  }
`;
