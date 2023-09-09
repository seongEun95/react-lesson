/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface RowProps {
  children: React.ReactNode;
  justify?: 'flex-start' | 'center' | 'flex-end';
  gap?: number;
}

export default function Row({
  children,
  justify = 'flex-start',
  gap = 0,
}: RowProps) {
  return <div css={RowCss(justify, gap)}>{children}</div>;
}

const RowCss = (justify: string, gap: number) => css`
  display: flex;
  flex-direction: row;
  justify-content: ${justify};
  gap: ${gap}px;
`;
