import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authFail, authSuccess } from 'src/redux/reducers/auth';
import { openModal } from 'src/redux/reducers/components/modals';
import {
  patchPassword,
  patchUserProfile,
  updateUserInfo,
  userFailPassword,
  userFailUserInfo,
  userFailUserProfile,
  UserInfoType,
  userPendingPassword,
  userPendingUserInfo,
  userPendingUserProfile,
  UserProfileType,
  userSuccessPassword,
  userSuccessUserInfo,
  userSuccressProfile,
} from 'src/redux/reducers/users';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';
import { patchProfileType, UserService } from 'src/services/UserService';
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
    yield put(
      userFailUserInfo(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    TokenService.remove();
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

function* getUserProfileSaga() {
  try {
    yield put(userPendingUserProfile());
    const userProfile: UserProfileType = yield call(UserService.getUserProfile);
    yield put(userSuccressProfile(userProfile));
  } catch (error: any) {
    yield put(
      userFailUserProfile(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    TokenService.remove();
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

function* updateUserProfileSaga({ payload }: PayloadAction<patchProfileType>) {
  try {
    yield put(userPendingUserProfile());
    const userProfile: UserProfileType = yield call(
      UserService.patchUserProfile,
      payload.data
    );
    yield put(userSuccressProfile(userProfile));
  } catch (error: any) {
    yield put(
      userFailUserProfile(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    TokenService.remove();
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

function* updatePasswordSaga({ payload }: PayloadAction<patchPasswordType>) {
  try {
    yield put(userPendingPassword());
    yield call(UserService.patchPassword, payload);
    yield put(userSuccessPassword());
    yield put(openModal('SuccessPasswordChangeModal'));
    // TODO: 성공 메세지
  } catch (error: any) {
    yield put(
      userFailPassword(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

export function* userSaga() {
  yield takeLatest(updateUserInfo.type, getUserInfoSaga);
  yield takeLatest(updateUserInfo.type, getUserProfileSaga);
  yield takeLatest(patchUserProfile.type, updateUserProfileSaga);
  yield takeLatest(patchPassword.type, updatePasswordSaga);
}
