/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'; // 이모션 사용

export type CheckBoxType = 'unselected' | 'selected';

interface CheckBoxProps {
  children: React.ReactNode;
  kind?: CheckBoxType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export default function Checkbox({
  children,
  kind = 'unselected',
  disabled = false,
  onClick,
}: CheckBoxProps) {
  return (
    <label css={[commonCss]}>
      <input
        css={[inputCss, disabled && disabledCss]}
        disabled={disabled}
        onClick={onClick}
        type="checkbox"
      />
      <span css={[checkMarkCss, getCssByKind(kind)]}></span>
      <span>{children}</span>
    </label>
  );
}

const commonCss = css`
  font-size: 20px;
  color: #000;
`;

const disabledCss = css`
  & ~ * {
    opacity: 0.2;
  }
  & + span {
    &::before {
      display: none;
    }
  }
`;

const getCssByKind = (kind: CheckBoxType) => {
  switch (kind) {
    case 'unselected':
      return unselectedCss;
    case 'selected':
      return selectedCss;
  }
};

const inputCss = css`
  margin-right: 10px;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: #000;
  }
`;

const unselectedCss = css`
  background-color: #fff;
`;

const selectedCss = css`
  background-color: #000;
`;

const checkMarkCss = css`
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  border: 2px solid #333;
  border-radius: 3px;
  margin-right: 10px;
  box-sizing: border-box;
  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 7px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    border: 2px solid dodgerblue;
    width: 20px;
    height: 20px;
    transform: translate(-22%, -22%);
  }
`;
