/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface ColumnProps {
  children: React.ReactNode;
  align?: 'flex-start' | 'center' | 'flex-end';
  gap?: number;
}

export default function Column({
  children,
  align = 'flex-start',
  gap = 0,
}: ColumnProps) {
  return <div css={columnCss(align, gap)}>{children}</div>;
}

const columnCss = (align: string, gap: number) => css`
  display: flex;
  flex-direction: column;
  align-items: ${align};
  gap: ${gap}px;
`;
