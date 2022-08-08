import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoType = {
  no: number | null;
  role: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  position: string | null;
  technicalStackDtoList: string[];
};

interface UserState {
  loading: boolean;
  error: any;
  userInfo: UserInfoType;
}

export const initUserInfo = {
  no: null,
  role: null,
  name: null,
  email: null,
  image: null,
  position: null,
  technicalStackDtoList: [],
};

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: initUserInfo,
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

export const updateUserInfo = createAction(`${userState}/updateUserInfo`);

export default userSlice.reducer;
