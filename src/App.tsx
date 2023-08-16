/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import './style/global.css';

import Router from './router';

export default function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

const textCss = css`
  color: blue;
  font-size: '30px';
`;
