import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { closeModal } from 'src/redux/reducers/modals';
import { getUserInfo } from 'src/redux/reducers/users';
import {
  removeSigninErrorMsg,
  setSigninErrorMsg,
} from 'src/redux/reducers/validation';
import { TokenService } from 'src/services/TokenService';
import { UserService } from 'src/services/UserService';
import {
  authFail,
  authPending,
  authSuccess,
  signin,
  signinOAuth,
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
    yield put(removeSigninErrorMsg());
    yield put(closeModal('LoginModal'));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    yield put(setSigninErrorMsg('auth')); // validation
  }
}

function* signOutSaga() {
  try {
    yield put(authPending());
    const token: string = yield select((state) => state.authReducer.token);
    yield call(UserService.signOut, token);
    TokenService.set(token);
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  } finally {
    TokenService.remove();
    yield put(authSuccess(null));
    yield put(getUserInfo());
  }
}

function* oAuthSaga({ payload }: PayloadAction<string>) {
  try {
    yield put(authPending());
    const token: string = payload;
    TokenService.set(token);
    yield put(authSuccess(token));
    yield put(getUserInfo());
    yield put(closeModal('LoginModal'));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

export function* authSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(signOut.type, signOutSaga);
  yield takeLatest(signinOAuth.type, oAuthSaga);
}
