/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function Title({ children }: { children: React.ReactNode }) {
  return <h1 css={titelCss}>{children}</h1>;
}

const titelCss = css`
  color: #797676;
  font-size: 30px;
  font-weight: bold;
`;
