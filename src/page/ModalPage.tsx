/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from '../components/uiChallenge/Button';
import Modal from '../components/uiChallenge/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setContentModal, setIsShowModal } from '../redux/slice/layoutSilce';

export default function ModalPage() {
  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(setContentModal('wow'));
    dispatch(setIsShowModal(true));
  };

  return (
    <div css={ModalPageCss}>
      <Button onClick={handleClickButton}>show modal</Button>
    </div>
  );
}

const ModalPageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;
