import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  RecruitModal: boolean;
  AuthModal: boolean;
  SignupEmailSentModal: boolean;
  AlertModal: boolean;
  SuccessDeleteUserModal: boolean;
  PositionApplyModal: boolean;
  NotificationModal: boolean;
  RejectModal: boolean;
}

export type ModalActionProps = keyof ModalState;

const initialState: ModalState = {
  RecruitModal: false,
  AuthModal: false,
  SignupEmailSentModal: false,
  AlertModal: false,
  SuccessDeleteUserModal: false,
  PositionApplyModal: false,
  NotificationModal: false,
  RejectModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions: PayloadAction<ModalActionProps>) => {
      return {
        ...state,
        [actions.payload]: true,
      };
    },
    closeModal: (state, actions: PayloadAction<ModalActionProps>) => {
      return {
        ...state,
        [actions.payload]: false,
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
