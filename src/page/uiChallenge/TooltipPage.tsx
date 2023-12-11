/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import Tooltip from '../../components/uiChallenge/Tooltip';
import { FaRegQuestionCircle } from 'react-icons/fa';

export default function TooltipPage() {
  return (
    <div css={row}>
      <Tooltip
        width="300px"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus numquam, odio saepe, tempora delectus fugiat dignissimos tempore illo quas aliquam blanditiis, placeat explicabo porro similique. Quibusdam distinctio non quasi."
      >
        <div css={tooltipTargetCss}>tooltip challenge</div>
      </Tooltip>

      <Tooltip width="120px" content="툴팁 컴포넌트">
        <div css={tooltipTargetCss}>tooltip02</div>
      </Tooltip>

      <Tooltip width="100px" content="툴팁 컴포넌트">
        <FaRegQuestionCircle />
      </Tooltip>
    </div>
  );
}

const row = css`
  display: flex;
  gap: 100px;
  text-align: center;
  justify-content: center;
`;

const tooltipTargetCss = css`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid purple;
`;
