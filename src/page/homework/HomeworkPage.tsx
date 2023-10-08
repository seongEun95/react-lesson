/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { Link, Outlet } from 'react-router-dom';

export default function HomeworkPage() {
  return (
    <div css={wrapCss}>
      <h1 css={titleCss}>과제 리스트</h1>
      <ul css={listWrapCss}>
        <li>
          <Link css={linkCss} to="/homework/starbucks">
            스타벅스
          </Link>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

const wrapCss = css`
  width: 94%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding-bottom: 60px;
`;

const titleCss = css`
  font-size: 20px;
  font-weight: 500;
  margin: 24px 0 30px;
  color: dodgerblue;
`;

const listWrapCss = css`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
`;

const linkCss = css`
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:hover {
    background-color: dodgerblue;
    color: #fff;
  }
`;
