/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export const columnCss = (align: string, gap: number) => css`
  display: flex;
  flex-direction: column;
  align-items: ${align};
  gap: ${gap}px;
`;
