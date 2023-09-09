/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return <h2 css={subTitelCss}>{children}</h2>;
}

const subTitelCss = css`
  color: #797676;
  font-size: 20px;
  font-weight: bold;
`;
