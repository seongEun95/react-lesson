/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect } from 'react';
import ButtonChallenge from '../../components/uiChallenge/Button';
import { useDispatch } from 'react-redux';
import {
  contentChangeModal,
  showModal,
  titleChangeModal,
} from '../../redux/slice/modalSlice';

export default function ModalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(showModal(false));
    };
  }, []);

  const handleClickButton = () => {
    dispatch(showModal(true));
    dispatch(titleChangeModal('추석 모달 제목이요'));
    dispatch(contentChangeModal('행복하고 건강한 추석'));
  };

  return (
    <div>
      <ButtonChallenge onClick={handleClickButton}>모달창</ButtonChallenge>
    </div>
  );
}
