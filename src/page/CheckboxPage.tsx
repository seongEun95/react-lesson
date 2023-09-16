/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Checkbox from '../components/uiChallenge/Checkbox';
import React, { useState } from 'react';
import Title from '../components/common/Title';
import Column from '../components/common/Column';
import Row from '../components/common/Row';
import SubTitle from '../components/common/SubTitle';

export default function CheckboxPage() {
  const [checked, setChecked] = useState({
    checkbox1: true,
    checkbox2: false,
    checkbox3: true,
    checkbox4: false,
  });

  console.log(checked);
  const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.dir(e.target);
    const { name, checked } = e.target;
    setChecked(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div css={checkboxPageCss}>
      <Column align="center" gap={20}>
        <Title>Checkbox</Title>
        <Row gap={30}>
          <Column align="center" gap={20}>
            <SubTitle>Normal</SubTitle>
            <Checkbox
              name="checkbox1"
              checked={checked.checkbox1}
              label="normal checkbox1"
              onChange={handleClickCheckbox}
            />
            <Checkbox
              name="checkbox2"
              checked={checked.checkbox2}
              label="normal checkbox2"
              onChange={handleClickCheckbox}
            />
          </Column>

          <Column align="center" gap={20}>
            <SubTitle>Disabled</SubTitle>
            <Checkbox
              name="checkbox3"
              checked={checked.checkbox3}
              label="disabled checkbox3"
              disabled
              onChange={handleClickCheckbox}
            />
            <Checkbox
              name="checkbox4"
              checked={checked.checkbox4}
              label="disabled checkbox4"
              disabled
              onChange={handleClickCheckbox}
            />
          </Column>
        </Row>
      </Column>
    </div>
  );
}

const checkboxPageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;
