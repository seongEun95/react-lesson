/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

export type DropdownSize = 'small' | 'medium' | 'large';

interface DropdownProps {
  optionArray: string[]; // 드랍다운 옵션 설정
  size?: DropdownSize; // 드람다운 사이즈
  title?: string; // 드랍다운 타이틀
}

export default function Dropdown({
  optionArray,
  size = 'medium',
  title = 'Choose an option',
}: DropdownProps) {
  // 임시 옵션 배열 데이터
  const [options, setOptions] = useState(optionArray);

  // 옵션을 보여줄 것에 대한 상태
  const [isShowOption, setIsShowOption] = useState(false);

  // 선택된 옵션에 대한 상태
  const [selectedOption, setSelectedOption] = useState(title);

  // 선택된 옵션 즉, 드랍다운을 클릭 시 isShowOption 상태를 ! 부정연산자로 변경
  const handleClickShowOption = () => {
    setIsShowOption(prev => !prev);
  };

  // 선택된 옵션에 따라 선택된 텍스트(selectedOption 상태)를 변경시킴
  const handleClickSelectedOption = (option: string) => {
    setSelectedOption(option);
    setIsShowOption(prev => !prev);
  };

  return (
    <div css={dropdownWrapCss}>
      <div css={sizeTxtCss}>드랍다운 사이즈 : {size}</div>
      <div
        css={[dropdownSelectedCss, getCssBySelectedSize(size)]}
        onClick={handleClickShowOption}
      >
        <span>{selectedOption}</span>
        {/* 위, 아래 화살표 조건부 렌더링 */}
        {isShowOption ? (
          <IoIosArrowUp size={20} />
        ) : (
          <IoIosArrowDown size={20} />
        )}
      </div>

      {/* 옵션부분 조건부 렌더링 */}
      {isShowOption && (
        <ul css={dropdownOptionWrap}>
          {options.map((option: string, index: number) => (
            <li css={dropdownOption} key={index}>
              <span
                css={[dropdownOptionTxt, getCssByOptionSize(size)]}
                onClick={() => {
                  handleClickSelectedOption(option);
                }}
              >
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const sizeTxtCss = css`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`;

const dropdownWrapCss = css`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const dropdownSelectedCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  border-bottom: 1px solid #111;

  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

// 사이즈 별 조건부 스타일 적용
const getCssBySelectedSize = (size: DropdownSize) => {
  switch (size) {
    case 'small':
      return smallSelectedSizeCss;
    case 'medium':
      return mediumSelectedSizeCss;
    case 'large':
      return largeSelectedSizeCss;
  }
};

const smallSelectedSizeCss = css`
  padding: 10px 25px;
`;

const mediumSelectedSizeCss = css`
  padding: 14px 25px;
`;

const largeSelectedSizeCss = css`
  padding: 18px 25px;
`;

const dropdownOptionWrap = css`
  padding: 10px 20px;
  background-color: #f1f1f1;
  border: 1px solid #dedede;
`;

const dropdownOption = css`
  border-bottom: 1px solid #dedede;

  &:hover {
    background-color: #ddd;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const dropdownOptionTxt = css`
  display: inline-block;
  width: 100%;
  cursor: pointer;
`;

// 사이즈 별 조건부 스타일 적용
const getCssByOptionSize = (size: DropdownSize) => {
  switch (size) {
    case 'small':
      return smallOptionSizeCss;
    case 'medium':
      return mediumOptionSizeCss;
    case 'large':
      return largeOptionSizeCss;
  }
};

const smallOptionSizeCss = css`
  padding: 10px 0 10px 5px;
`;

const mediumOptionSizeCss = css`
  padding: 14px 0 14px 5px;
`;

const largeOptionSizeCss = css`
  padding: 18px 0 18px 5px;
`;
