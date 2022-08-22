import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patchPasswordType, patchProfileType } from 'src/services/UserService';

export type UserInfoType = {
  no: number | null;
  role: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  position: string | null;
  technicalStackDtoList: string[];
};

export type UserProfileType = {
  email: string | null;
  github: string | null;
  image: string | null;
  name: string | null;
  position: string | null;
  selfIntroduction: string | null;
  sex: string | null;
  technicalStackList: string[];
};

interface UserState {
  loadingUserInfo: boolean;
  errorUserInfo: any;
  loadingUserProfile: boolean;
  errorUserProfile: any;
  loadingUserPassword: boolean;
  errorUserPassword: any;
  userInfo: UserInfoType;
  userProfile: UserProfileType;
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

export const initUserProfile: UserProfileType = {
  email: null,
  github: null,
  image: null,
  name: null,
  position: null,
  selfIntroduction: null,
  sex: null,
  technicalStackList: [],
};

const initialState: UserState = {
  loadingUserInfo: false,
  errorUserInfo: null,
  loadingUserProfile: false,
  errorUserProfile: null,
  loadingUserPassword: false,
  errorUserPassword: null,
  userInfo: initUserInfo,
  userProfile: initUserProfile,
};

const userState = 'user';

const userSlice = createSlice({
  name: userState,
  initialState,
  reducers: {
    pendingUserInfo(state) {
      return {
        ...state,
        loadingUserInfo: true,
        errorUserInfo: null,
      };
    },
    failUserInfo(state, action: PayloadAction<UserState['errorUserInfo']>) {
      return {
        ...state,
        loadingUserInfo: false,
        userInfo: initUserInfo,
        errorUserInfo: action.payload,
      };
    },
    successUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
      return {
        ...state,
        loadingUserInfo: false,
        userInfo: action.payload,
        errorUserInfo: null,
      };
    },
    pendingUserProfile(state) {
      return {
        ...state,
        loadingUserProfile: true,
        errorUserProfile: null,
      };
    },
    failUserProfile(
      state,
      action: PayloadAction<UserState['errorUserProfile']>
    ) {
      return {
        ...state,
        loadingUserProfile: false,
        userProfile: initUserProfile,
        errorUserProfile: action.payload,
      };
    },
    successUserProfile(state, action: PayloadAction<UserState['userProfile']>) {
      return {
        ...state,
        loadingUserProfile: false,
        userProfile: action.payload,
        errorUserProfile: null,
      };
    },
    pendingPassword(state) {
      return {
        ...state,
        loadingUserPassword: true,
        errorUserPassword: null,
      };
    },
    failPassword(state, action: PayloadAction<UserState['errorUserPassword']>) {
      return {
        ...state,
        loadingUserPassword: false,
        errorUserPassword: action.payload,
      };
    },
    successPassword(state) {
      return {
        ...state,
        loadingUserPassword: false,
        errorUserPassword: null,
      };
    },
  },
});

export const {
  pendingUserInfo: userPendingUserInfo,
  failUserInfo: userFailUserInfo,
  successUserInfo: userSuccessUserInfo,
  pendingUserProfile: userPendingUserProfile,
  failUserProfile: userFailUserProfile,
  successUserProfile: userSuccressProfile,
  pendingPassword: userPendingPassword,
  failPassword: userFailPassword,
  successPassword: userSuccessPassword,
} = userSlice.actions;

export const updateUserInfo = createAction(`${userState}/updateUserInfo`);
export const patchUserProfile = createAction<patchProfileType>(
  `${userState}/patchUserProfile`
);
export const patchPassword = createAction<patchPasswordType>(
  `${userState}/patchPassword`
);

export default userSlice.reducer;
