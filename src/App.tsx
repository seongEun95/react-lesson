/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import './style/global.css';

export default function App() {
  return (
    <div>
      <div css={textCss}>emotion css</div>
    </div>
  );
}

const textCss = css`
  color: blue;
  font-size: '30px';
`;
