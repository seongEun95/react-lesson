import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modal: {
    isShow: boolean;
    content: any;
    onConfirm: (() => void) | undefined;
  };
}

const initialState: ModalState = {
  modal: {
    isShow: false,
    content: 'wow',
    onConfirm: undefined,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsShowModal(state, action: PayloadAction<boolean>) {
      state.modal.isShow = action.payload;
    },

    setContentModal(state, action: PayloadAction<any>) {
      state.modal.content = action.payload;
    },

    setOnConfirmModal(state, action: PayloadAction<() => void>) {
      state.modal.onConfirm = action.payload;
    },
  },
});

export const { setIsShowModal, setContentModal, setOnConfirmModal } =
  modalSlice.actions;
export default modalSlice.reducer;
