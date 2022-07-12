import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoType } from 'redux/sagas/userSaga';

interface UserState {
  loading: boolean;
  error: any;
  userInfo: UserInfoType | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: null,
};

const userState = 'user';

const userSlice = createSlice({
  name: userState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success(state, action: PayloadAction<UserState['userInfo']>) {
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    },
    fail(state, action: PayloadAction<UserState['error']>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  pending: userPending,
  fail: userFail,
  success: userSuccess,
} = userSlice.actions;

export const getUserInfo = createAction(`${userState}/getUserInfo`);

export default userSlice.reducer;
