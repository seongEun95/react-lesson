import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modal: {
    isShow: boolean;
    content: any;
    title: string;
    onConfirm: (() => void) | undefined;
  };
}

const initialState: ModalState = {
  modal: {
    isShow: false,
    content: '',
    title: '',
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

    setOnConfirmModal(state, action: PayloadAction<(() => void) | undefined>) {
      state.modal.onConfirm = action.payload;
    },

    setTitleModal(state, action: PayloadAction<string>) {
      state.modal.title = action.payload;
    },

    resetModal(state) {
      state.modal.isShow = false;
      state.modal.content = '';
      state.modal.onConfirm = undefined;
    },
  },
});

export const {
  setIsShowModal,
  setContentModal,
  setTitleModal,
  setOnConfirmModal,
  resetModal,
} = modalSlice.actions;
export default modalSlice.reducer;
