import { PayloadAction } from '@reduxjs/toolkit';
import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
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
  delayReissue,
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

function* delayReissueSaga({ payload }: PayloadAction<reissueReqType>) {
  try {
    const { access, refresh } = payload;
    yield delay(1000 * 60 * 60 * 2 - 1000 * 30);
    yield put(reissueToken({ access, refresh }));
  } catch (error: any) {
    // TODO: 로그인을 다시 해주세요.
  }
}

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
    yield put(delayReissue({ access, refresh }));
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
    TokenService.removeRefresh();
    TokenService.removeExp();
    yield put(authSuccess(null));
    yield put(getUserInfo());
  }
}

function* oAuthSaga({ payload }: PayloadAction<TokenType>) {
  try {
    yield put(authPending());
    const tokens: TokenType = payload;
    TokenService.set(tokens.access);
    TokenService.setRefresh(tokens.refresh);
    TokenService.setExp(tokens.access_exp);
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
    yield put(delayReissue({ access, refresh: payload.refresh }));
  } catch (error: any) {
    yield put(
      authFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    TokenService.removeRefresh();
    // 로그인을 다시 시도해주세요.
  }
}

export function* authSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(signOut.type, signOutSaga);
  yield takeLatest(signinOAuth.type, oAuthSaga);
  yield takeLatest(signup.type, signupSaga);
  yield takeLatest(reissueToken.type, reissueTokenSaga);
  yield takeEvery(delayReissue.type, delayReissueSaga);
}
