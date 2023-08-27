/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from '../components/Button';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function DraftPage() {
  return (
    <div css={pageCss}>
      <Button backgroundColor="red" width="50px" height="50px">
        <RiDeleteBin5Fill size={24} />
      </Button>
      <Button backgroundColor="blue">test</Button>
    </div>
  );
}

const pageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;
