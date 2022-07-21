import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  RecruitModal: boolean;
  LoginModal: boolean;
}

type ActionProps = keyof ModalState;

const initialState: ModalState = {
  RecruitModal: false,
  LoginModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions: PayloadAction<ActionProps>) => {
      return {
        ...state,
        [actions.payload]: true,
      };
    },
    closeModal: (state, actions: PayloadAction<ActionProps>) => {
      return {
        ...state,
        [actions.payload]: false,
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
