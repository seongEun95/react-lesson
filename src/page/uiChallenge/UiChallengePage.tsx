/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function UiChallengePage() {
  return (
    <div>
      <div css={uiMenu}>
        <h1 css={title}>Ui 챌린지</h1>
        <ul>
          <li css={list}>
            <Link to="/ui/button">버튼</Link>
            <Link to="/ui/checkbox">체크박스</Link>
            <Link to="/ui/modal">모달창</Link>
          </li>
        </ul>
      </div>

      <div css={content}>
        <Outlet />
      </div>
    </div>
  );
}

const uiMenu = css`
  text-align: center;
  margin: 50px 0 80px;
`;

const title = css`
  font-size: 24px;
  color: dodgerblue;
  margin-bottom: 10px;
`;

const list = css`
  a {
    display: inline-block;
    margin: 5px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    transition: 0.1s;
    &:hover {
      background-color: dodgerblue;
      color: #fff;
    }
  }
`;

const content = css`
  max-width: 1200px;
  width: 94%;
  margin: 0 auto;
`;
