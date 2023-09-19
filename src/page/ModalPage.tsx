/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Button from '../components/uiChallenge/Button';
import { useDispatch } from 'react-redux';
import {
  resetModal,
  setContentModal,
  setIsShowModal,
  setOnConfirmModal,
  setTitleModal,
} from '../redux/slice/layoutSilce';
import { useEffect } from 'react';

export default function ModalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetModal());
    };
  }, []);

  const handleClickButton1 = () => {
    dispatch(setTitleModal('Modal'));
    dispatch(setContentModal('wow'));
    dispatch(setIsShowModal(true));
  };

  const handleClickButton2 = () => {
    dispatch(setTitleModal('Modal'));
    dispatch(setContentModal('has onConfirm'));
    dispatch(setIsShowModal(true));
    dispatch(
      setOnConfirmModal(() => {
        console.log('onConfirm!');
        dispatch(resetModal());
      }),
    );
  };

  return (
    <div css={ModalPageCss}>
      <Button onClick={handleClickButton1}>show modal</Button>
      <Button type="secondary" onClick={handleClickButton2}>
        show modal with onConfirm
      </Button>
    </div>
  );
}

const ModalPageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;
