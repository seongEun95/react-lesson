/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'; // 이모션 사용

interface ButtonChallengeProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor: string;
  color?: string;
  border?: string;
  fontSize?: string;
  onClick?: React.MouseEventHandler;
}

export default function ButtonChallenge({
  children,
  width = '280px',
  height = '60px',
  color = '#fff',
  backgroundColor,
  border = 'none',
  fontSize = '18px',
  onClick,
}: ButtonChallengeProps) {
  return (
    <button
      onClick={onClick}
      css={ButtonChallCss(
        width,
        height,
        color,
        backgroundColor,
        border,
        fontSize,
      )}
    >
      {children}
    </button>
  );
}

const ButtonChallCss = (
  width: string,
  height: string,
  color: string,
  backgroundColor: string,
  border: string,
  fontSize: string,
) => css`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: ${width};
  height: ${height};
  color: ${color};
  background-color: ${backgroundColor};
  border: ${border};
  font-size: ${fontSize};
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
