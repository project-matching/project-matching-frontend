import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserInfo } from 'redux/reducers/users';
import { TokenService } from 'services/TokenService';
import { UserService } from 'services/UserService';
import {
  authFail,
  authPending,
  authSuccess,
  signin,
  signOut,
} from '../reducers/auth';

export type SigninReqType = {
  email: string;
  password: string;
};

function* signinSaga({ payload }: PayloadAction<SigninReqType>) {
  try {
    yield put(authPending());
    const token: string = yield call(UserService.signin, payload);
    TokenService.set(token);
    yield put(authSuccess(token));
    yield put(getUserInfo());
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

function* signOutSaga() {
  try {
    yield put(authPending());
    const token: string = yield select((state) => state.authReducer.token);
    yield call(UserService.signOut, token);
    yield put(getUserInfo());
    TokenService.set(token);
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  } finally {
    TokenService.remove();
    yield put(authSuccess(null));
  }
}

export function* authSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(signOut.type, signOutSaga);
}
