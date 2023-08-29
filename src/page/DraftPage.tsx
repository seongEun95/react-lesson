/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from '../components/button';
import { BsTrash } from 'react-icons/bs';

export default function DraftPage() {
  return (
    <div css={pageCss}>
      <Button backgroundColor="green" width="100px" height="100px">
        <BsTrash size={50} />
      </Button>
      <Button backgroundColor="blue">test</Button>
    </div>
  );
}

const pageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
