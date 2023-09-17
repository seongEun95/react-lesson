/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from '../components/uiChallenge/Button';
import SubTitle from '../components/common/SubTitle';
import Column from '../components/common/Column';
import Row from '../components/common/Row';
import Title from '../components/common/Title';
import { useDispatch } from 'react-redux';
import {
  setContentModal,
  setIsShowModal,
  setOnConfirmModal,
} from '../redux/slice/layoutSilce';
import { useState } from 'react';

export default function ButtonPage() {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);

  const handleClickButton = () => {
    console.log('버튼 클릭!');
  };

  const handleClickLargeButton = () => {
    dispatch(
      setOnConfirmModal(() => {
        setShowButton(true);
      }),
    );
    dispatch(setContentModal('Button을 더 보시겠습니까?'));
    dispatch(setIsShowModal(true));
  };

  return (
    <div css={buttonPageCss}>
      <Column align="center" gap={30}>
        <Title>Button</Title>
        <Row gap={50}>
          <Column align="center" gap={10}>
            {/* <div css={columnCss('center', 20)}> */}
            <SubTitle>type</SubTitle>
            <Button onClick={handleClickButton}>Primary</Button>
            <Button type="secondary" onClick={handleClickButton}>
              Primary
            </Button>
            <Button type="tertiary" onClick={handleClickButton}>
              Tertiary
            </Button>
            <Button type="danger" onClick={handleClickButton}>
              Danger
            </Button>
            <Button type="ghost" onClick={handleClickButton}>
              Ghost
            </Button>
            {/* </div> */}
          </Column>

          <Column align="center" gap={10}>
            <SubTitle>size</SubTitle>
            <Button size="small" onClick={handleClickButton}>
              small
            </Button>
            <Button size="medium" onClick={handleClickButton}>
              medium
            </Button>
            <Button size="large" onClick={handleClickLargeButton}>
              large
            </Button>
          </Column>

          {showButton && (
            <Column align="center" gap={10}>
              <SubTitle>disabled</SubTitle>
              <Button disabled onClick={handleClickButton}>
                disabled
              </Button>
              <Button type="secondary" disabled onClick={handleClickButton}>
                disabled
              </Button>
              <Button type="tertiary" disabled onClick={handleClickButton}>
                disabled
              </Button>
              <Button type="danger" disabled onClick={handleClickButton}>
                disabled
              </Button>
              <Button type="ghost" disabled onClick={handleClickButton}>
                disabled
              </Button>
            </Column>
          )}
        </Row>
      </Column>
    </div>
  );
}

const buttonPageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;
