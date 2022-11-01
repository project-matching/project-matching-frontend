import { fetchedData } from '@/components/Common/Layouts/InfiniteScrollLayout';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authSuccess, signOut } from 'src/redux/reducers/auth';
import { openModal } from 'src/redux/reducers/components/modals';
import {
  deleteUser,
  getUserInfo,
  getUserList,
  getUserProfile,
  patchPassword,
  patchUserProfile,
  userFailPassword,
  userFailUserDelete,
  userFailUserInfo,
  userFailUserList,
  userFailUserProfile,
  userFailUserSearchKeyword,
  UserInfoType,
  UserListType,
  userPendingPassword,
  userPendingUserDelete,
  userPendingUserInfo,
  userPendingUserList,
  userPendingUserProfile,
  userPendingUserSearchKeyword,
  UserProfileType,
  userSuccessPassword,
  userSuccessUserDelete,
  userSuccessUserInfo,
  userSuccessUserList,
  userSuccessUserSearchKeyword,
  userSuccressUserProfile,
} from 'src/redux/reducers/users';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';
import {
  getUserListType,
  patchProfileType,
  UserService,
} from 'src/services/UserService';
import { patchPasswordType } from './../../services/UserService';

function* getUserInfoSaga() {
  try {
    yield put(userPendingUserInfo());
    const token = TokenService.get();
    appApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const userInfo: UserInfoType = yield call(UserService.getUserInfo);
    yield put(authSuccess(token));
    yield put(userSuccessUserInfo(userInfo));
  } catch (error: any) {
    if (error?.response?.data?.error?.code !== 'DESTROY_JWT_TOKEN_EXCEPTION') {
      yield put(
        userFailUserInfo(
          new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
        )
      );
      yield put(signOut());
    }
  }
}

function* getUserProfileSaga() {
  try {
    yield put(userPendingUserProfile());
    const token = TokenService.get();
    if (!token) {
      throw new Error('NO_TOKEN');
    }
    const userProfile: UserProfileType = yield call(UserService.getUserProfile);
    yield put(userSuccressUserProfile(userProfile));
  } catch (error: any) {
    yield put(
      userFailUserProfile(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    yield put(openModal('AuthModal'));
  }
}

function* updateUserProfileSaga({ payload }: PayloadAction<patchProfileType>) {
  try {
    yield put(userPendingUserProfile());
    yield call(UserService.patchUserProfile, payload.data);
    const userProfile: UserProfileType = yield call(UserService.getUserProfile);
    yield put(userSuccressUserProfile(userProfile));
    yield put(getUserInfo());
  } catch (error: any) {
    yield put(
      userFailUserProfile(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* updatePasswordSaga({ payload }: PayloadAction<patchPasswordType>) {
  try {
    yield put(userPendingPassword());
    yield call(UserService.patchPassword, payload);
    yield put(userSuccessPassword());
    yield put(openModal('AlertModal'));
  } catch (error: any) {
    yield put(
      userFailPassword(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* deleteUserSaga() {
  try {
    yield put(userPendingUserDelete());
    yield call(UserService.deleteUser);
    yield put(userSuccessUserDelete());
    yield put(openModal('SuccessDeleteUserModal'));
  } catch (error: any) {
    yield put(
      userFailUserDelete(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* getUserListSaga({ payload }: PayloadAction<getUserListType>) {
  try {
    yield put(userPendingUserList());
    if (payload.content && payload.userFilter) {
      yield put(userPendingUserSearchKeyword());
      yield put(
        userSuccessUserSearchKeyword({
          content: payload.content,
          userFilter: payload.userFilter,
        })
      );
    }
    const userList: fetchedData<UserListType> = yield call(
      UserService.getUserList,
      payload
    );
    yield put(userSuccessUserList(userList));
  } catch (error: any) {
    yield put(
      userFailUserList(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    yield put(userFailUserSearchKeyword());
  }
}

export function* userSaga() {
  yield takeLatest(getUserInfo.type, getUserInfoSaga);
  yield takeLatest(getUserProfile.type, getUserProfileSaga);
  yield takeLatest(patchUserProfile.type, updateUserProfileSaga);
  yield takeLatest(patchPassword.type, updatePasswordSaga);
  yield takeLatest(deleteUser.type, deleteUserSaga);
  yield takeLatest(getUserList.type, getUserListSaga);
}
