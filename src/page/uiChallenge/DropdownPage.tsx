/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Dropdown from '../../components/uiChallComp/Dropdown';

export default function DropdownPage() {
  return (
    <div css={row}>
      <Dropdown
        title="선호하는 스포츠 브랜드"
        size="large"
        optionArray={[
          '나이키',
          '아디다스',
          '리복',
          '아식스',
          '뉴발란스',
          '푸마',
        ]}
      />
      <Dropdown
        title="음식을 골라주세요"
        optionArray={['햄버거', '피자', '치킨', '콜라', '떡볶이']}
      />
      <Dropdown
        title="선호하는 개발언어를 골라주세요"
        size="small"
        optionArray={['JAVA', 'JavaScript', 'Python', 'C#', 'GO', 'php']}
      />
    </div>
  );
}

const row = css`
  display: flex;
`;
