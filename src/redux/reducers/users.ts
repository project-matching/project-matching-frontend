import { fetchedData } from '@/components/Layouts/InfiniteScrollLayout';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserListType,
  patchPasswordType,
  patchProfileType,
} from 'src/services/UserService';

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

export interface UserListType {
  email: string;
  image: string | null;
  name: string;
  userNo: number;
  block: boolean;
}

interface UserState {
  loadingUserInfo: boolean;
  errorUserInfo: any;
  loadingUserProfile: boolean;
  errorUserProfile: any;
  loadingUserPassword: boolean;
  errorUserPassword: any;
  loadingUserDelete: boolean;
  errorUserDelete: any;
  loadingUserList: boolean;
  errorUserList: any;
  loadingUserSearchKeyword: boolean;
  errorUserSearchKeyword: any;
  userInfo: UserInfoType;
  userProfile: UserProfileType;
  userList: fetchedData<UserListType> | null;
  userSearchKeyword: string | null;
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
  loadingUserDelete: false,
  errorUserDelete: null,
  loadingUserList: false,
  errorUserList: null,
  loadingUserSearchKeyword: false,
  errorUserSearchKeyword: null,
  userInfo: initUserInfo,
  userProfile: initUserProfile,
  userList: null,
  userSearchKeyword: null,
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
    pendingUserDelete(state) {
      return {
        ...state,
        loadingUserDelete: true,
        errorUserDelete: null,
      };
    },
    failUserDelete(state, action: PayloadAction<UserState['errorUserDelete']>) {
      return {
        ...state,
        loadingUserDelete: false,
        errorUserDelete: action.payload,
      };
    },
    successUserDelete(state) {
      return {
        ...state,
        loadingUserDelete: false,
        errorUserDelete: null,
      };
    },
    pendingUserList(state) {
      return {
        ...state,
        loadingUserList: true,
        errorUserList: null,
      };
    },
    failUserList(state, action: PayloadAction<UserState['errorUserList']>) {
      return {
        ...state,
        loadingUserList: false,
        errorUserList: action.payload,
      };
    },
    successUserList(state, action: PayloadAction<UserState['userList']>) {
      return {
        ...state,
        loadingUserList: false,
        errorUserList: null,
        userList: action.payload,
      };
    },
    pendingUserSearchKeyword(state) {
      return {
        ...state,
        loadingUserSearchKeyword: true,
        errorUserSearchKeyword: null,
      };
    },
    failUserSearchKeyword(state) {
      return {
        ...state,
        loadingUserSearchKeyword: false,
        errorUserSearchKeyword: 'Failed to get user search keyword',
      };
    },
    successUserSearchKeyword(
      state,
      action: PayloadAction<UserState['userSearchKeyword']>
    ) {
      return {
        ...state,
        loadingUserSearchKeyword: false,
        errorUserSearchKeyword: null,
        userSearchKeyword: action.payload,
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
  successUserProfile: userSuccressUserProfile,
  pendingPassword: userPendingPassword,
  failPassword: userFailPassword,
  successPassword: userSuccessPassword,
  pendingUserDelete: userPendingUserDelete,
  failUserDelete: userFailUserDelete,
  successUserDelete: userSuccessUserDelete,
  pendingUserList: userPendingUserList,
  failUserList: userFailUserList,
  successUserList: userSuccessUserList,
  pendingUserSearchKeyword: userPendingUserSearchKeyword,
  failUserSearchKeyword: userFailUserSearchKeyword,
  successUserSearchKeyword: userSuccessUserSearchKeyword,
} = userSlice.actions;

export const getUserInfo = createAction(`${userState}/getUserInfo`);
export const getUserProfile = createAction(`${userState}/getUserProfile`);
export const patchUserProfile = createAction<patchProfileType>(
  `${userState}/patchUserProfile`
);
export const patchPassword = createAction<patchPasswordType>(
  `${userState}/patchPassword`
);
export const deleteUser = createAction(`${userState}/deleteUser`);

export const getUserList = createAction<getUserListType>(
  `${userState}/getUserList`
);

export default userSlice.reducer;
