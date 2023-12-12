/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

interface TooltipProps {
  children: any;
  content: string;
  width?: string;
}

export default function Tooltip({
  children,
  content,
  width = '',
}: TooltipProps) {
  const [isShow, setIsShow] = useState(false);

  const handleMouseEnter = () => {
    setIsShow(true);
  };

  const handleMouseLeave = () => {
    setIsShow(false);
  };

  return (
    <div
      css={tooltipWrapCss}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isShow && <div css={tooltipContentCss(width)}>{content}</div>}
    </div>
  );
}

const tooltipWrapCss = css`
  position: relative;
`;

const tooltipContentCss = (width: string) => css`
  position: absolute;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, 20px);
  width: ${width};
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  background: #333;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -19px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid #333;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;
