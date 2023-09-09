/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'; // 이모션 사용

interface ButtonChallengeProps {
  children: React.ReactNode;
  kind?: 'primary' | 'secondary' | 'teriary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export default function ButtonChallenge({
  children,
  kind = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonChallengeProps) {
  let btnKind;

  switch (kind) {
    case 'primary':
      btnKind = primary;
      break;
    case 'secondary':
      btnKind = secondary;
      break;
    case 'teriary':
      btnKind = teriary;
      break;
    case 'danger':
      btnKind = danger;
      break;
    case 'ghost':
      btnKind = ghost;
      break;
  }

  let btnSize;

  switch (size) {
    case 'small':
      btnSize = small;
      break;
    case 'medium':
      btnSize = medium;
      break;
    case 'large':
      btnSize = large;
      break;
    case 'xlarge':
      btnSize = xlarge;
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      css={[commonCss, btnKind, btnSize]}
    >
      {children}
    </button>
  );
}

var primary = css`
  color: #fff;
  background-color: #3567d3;
`;

var secondary = css`
  background-color: #484848;
  color: #fff;
`;

var teriary = css`
  background-color: #fff;
  color: #3567d3;
  border: 1px solid #3567d3;
`;

var danger = css`
  background-color: #d32c2c;
  color: #fff;
`;

var ghost = css`
  background-color: #fff;
  color: #3567d3;
`;

var small = css`
  padding: 10px 0;
`;

var medium = css`
  padding: 15px 0;
`;

var large = css`
  padding: 10px 0 30px;
`;

var xlarge = css`
  padding: 10px 0 40px;
`;

const commonCss = () => css`
  display: flex;
  align-items: center;
  padding-left: 20px !important;
  box-sizing: border-box;
  width: 220px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    border: 1px solid #ddd;
    cursor: not-allowed;
  }
`;
