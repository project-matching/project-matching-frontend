import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TokenService } from 'services/TokenService';
import { UserService } from 'services/UserService';
import { fail, pending, signin, signOut, success } from '../reducers/auth';

export type SigninReqType = {
  email: string;
  password: string;
};

function* signinSaga({ payload }: PayloadAction<SigninReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.signin, payload);
    TokenService.set(token);
    yield put(success(token));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  }
}

function* signOutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.authReducer.token);
    yield call(UserService.signOut, token);
    TokenService.set(token);
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(signOut.type, signOutSaga);
}
