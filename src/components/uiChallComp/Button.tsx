/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'; // 이모션 사용

// 버튼 타입 별도 선언
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'teriary'
  | 'danger'
  | 'ghost';

// 버튼 사이즈 별도 선언
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ButtonChallengeProps {
  children: React.ReactNode;
  kind?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonChallenge({
  children,
  kind = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonChallengeProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      css={[commonCss, getCssKind(kind), getCssSize(size)]}
    >
      {children}
    </button>
  );
}
// switch 문을 활용한 버튼 종류 조건부 렌더링 / 풀리퀘스트 테스트 중
const getCssKind = (kind: ButtonType) => {
  switch (kind) {
    case 'primary':
      return primaryCss;
    case 'secondary':
      return secondaryCss;
    case 'teriary':
      return teriaryCss;
    case 'danger':
      return dangerCss;
    case 'ghost':
      return ghostCss;
  }
};

const primaryCss = css`
  color: #fff;
  background-color: #3567d3;
`;

const secondaryCss = css`
  background-color: #484848;
  color: #fff;
`;

const teriaryCss = css`
  background-color: #fff;
  color: #3567d3;
  border: 1px solid #3567d3;
`;

const dangerCss = css`
  background-color: #d32c2c;
  color: #fff;
`;

const ghostCss = css`
  background-color: #fff;
  color: #3567d3;
`;

// 버튼 사이즈 조건부 렌더링 / 풀리퀘스트 테스트
const getCssSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return smallCss;
    case 'medium':
      return mediumCss;
    case 'large':
      return largeCss;
    case 'xlarge':
      return xlargeCss;
  }
};

const smallCss = css`
  padding: 10px 0;
`;

const mediumCss = css`
  padding: 15px 0;
`;

const largeCss = css`
  padding: 10px 0 30px;
`;

const xlargeCss = css`
  padding: 10px 0 40px;
`;

const commonCss = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 220px;
  width: 100%;
  font-size: 18px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    border: 1px solid #ddd;
    cursor: not-allowed;
  }
`;
