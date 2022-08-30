import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface notificationStateType {
  notificationDetail: {
    title: string;
    content: string;
    createDate: string;
  } | null;
  loading: boolean;
  error: any;
}

const initialState: notificationStateType = {
  notificationDetail: null,
  loading: false,
  error: null,
};

const notificationState = 'notification';

const notificationSlice = createSlice({
  name: notificationState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success(
      state,
      action: PayloadAction<notificationStateType['notificationDetail']>
    ) {
      return {
        ...state,
        loading: false,
        notificationDetail: action.payload,
        error: null,
      };
    },
    fail(state, action: PayloadAction<notificationStateType['error']>) {
      return {
        ...state,
        loading: false,
        notificationDetail: null,
        error: action.payload,
      };
    },
  },
});

export const {
  pending: notificationPending,
  success: notificationSuccess,
  fail: notificationFail,
} = notificationSlice.actions;

export const notificationDetail = createAction<number>(
  `${notificationState}/notificationDetail`
);

export default notificationSlice.reducer;
