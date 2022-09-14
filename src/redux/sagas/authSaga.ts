import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { closeModal, openModal } from 'src/redux/reducers/components/modals';
import {
  removeSigninErrorMsg,
  setSigninErrorMsg,
} from 'src/redux/reducers/components/validation';
import { getUserInfo } from 'src/redux/reducers/users';
import { TokenService } from 'src/services/TokenService';
import { reissuedType, UserService } from 'src/services/UserService';
import {
  authFail,
  authPending,
  authSuccess,
  signin,
  signinOAuth,
  signOut,
  signup,
  TokenType,
} from '../reducers/auth';
import { reissueReqType } from './../../services/UserService';
import { reissueToken } from './../reducers/auth';

export type SigninReqType = {
  email: string;
  password: string;
};

export type SignupReqType = {
  name: string;
  email: string;
  password: string;
};

function* signinSaga({ payload }: PayloadAction<SigninReqType>) {
  try {
    yield put(authPending());
    const { access, refresh, access_exp }: TokenType = yield call(
      UserService.signin,
      payload
    );
    TokenService.set(access);
    TokenService.setRefresh(refresh);
    TokenService.setExp(access_exp);
    yield put(authSuccess(access));
    yield put(getUserInfo());
    yield put(removeSigninErrorMsg());
    yield put(closeModal('AuthModal'));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    if (error?.response?.data?.error.code === 'BLOCKED_EXCEPTION') {
      yield put(setSigninErrorMsg('blocked'));
      return;
    }
    yield put(setSigninErrorMsg('auth')); // validation
  }
}

function* signOutSaga() {
  try {
    yield put(authPending());
    const token: string = yield select((state) => state.authReducer.token);
    yield call(UserService.signOut);
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

function* oAuthSaga({ payload }: PayloadAction<TokenType>) {
  try {
    yield put(authPending());
    const tokens: TokenType = payload;
    tokens.access && TokenService.set(tokens.access);
    yield put(authSuccess(null));
    yield put(getUserInfo());
    yield put(removeSigninErrorMsg());
    yield put(closeModal('AuthModal'));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    // TODO: 실패했을 때 경고창
  }
}

function* signupSaga({ payload }: PayloadAction<SignupReqType>) {
  try {
    yield put(authPending());
    yield call(UserService.signup, payload);
    yield put(authSuccess(null));
    yield put(openModal('SignupEmailSentModal'));
    yield put(closeModal('AuthModal'));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
      // TODO: 이메일이 이미 존재할 경우 경고창
    );
  }
}

function* reissueTokenSaga({ payload }: PayloadAction<reissueReqType>) {
  try {
    yield put(authPending());
    const { access, access_exp }: reissuedType = yield call(
      UserService.reissueToken,
      payload
    );
    yield TokenService.set(access);
    TokenService.setExp(access_exp);
    yield put(authSuccess(access));
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
  yield takeLatest(signup.type, signupSaga);
  yield takeLatest(reissueToken.type, reissueTokenSaga);
}
