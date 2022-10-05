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
  validateToken,
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

export interface DelayReqType {
  time?: number;
  token: reissueReqType;
}

/**
 * 토큰 만료까지 남은 시간 (Seconds)
 */
const getRemainingExpSecond = (exp: number) =>
  exp - Math.floor(new Date().getTime() / 1000);

function* delayReissueSaga({ payload }: PayloadAction<DelayReqType>) {
  try {
    payload.time = payload.time ?? 1000 * 60 * 60 * 2 - 1000 * 30;
    const { access, refresh } = payload.token;
    yield delay(payload.time);
    yield put(reissueToken({ access, refresh }));

    const exp = TokenService.getExp();
    const newAccess = TokenService.get();
    const newRefresh = TokenService.getRefresh();

    if (newAccess && newRefresh) {
      yield put(
        delayReissue({
          token: { access: newAccess, refresh: newRefresh },
          time: getRemainingExpSecond(+exp),
        })
      );
    }
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
    yield put(delayReissue({ token: { access, refresh } }));
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
    const { access, access_exp }: reissuedType = yield call(
      UserService.reissueToken,
      payload
    );
    yield TokenService.set(access);
    TokenService.setExp(access_exp);
    yield put(getUserInfo());
  } catch (error: any) {
    TokenService.removeRefresh();
    // 로그인을 다시 시도해주세요.
  }
}

function* validateTokenSaga() {
  try {
    const exp = TokenService.getExp();
    const access = TokenService.get();
    const refresh = TokenService.getRefresh();

    if (!access || !refresh) {
      throw new Error('LOGIN_NEEDED');
    }

    const remainingExp = getRemainingExpSecond(+exp);

    if (exp && remainingExp < 10) {
      // 토큰 만료기간이 10초 미만일 경우
      yield put(reissueToken({ access, refresh }));

      const newAccess = TokenService.get();
      const newRefresh = TokenService.getRefresh();
      const newRemainingExp = getRemainingExpSecond(+TokenService.getExp());

      yield put(
        delayReissue({
          token: { access: newAccess, refresh: newRefresh },
          time: (newRemainingExp - 10) * 1000,
        })
      );
    } else {
      yield put(getUserInfo());
      yield put(
        delayReissue({
          token: { access, refresh },
          time: (remainingExp - 10) * 1000,
        })
      );
    }
  } catch (error: any) {
    // TODO: 로그인을 다시 시도해주세요.
  }
}

export function* authSaga() {
  yield takeLatest(signin.type, signinSaga);
  yield takeLatest(signOut.type, signOutSaga);
  yield takeLatest(signinOAuth.type, oAuthSaga);
  yield takeLatest(signup.type, signupSaga);
  yield takeEvery(reissueToken.type, reissueTokenSaga);
  yield takeEvery(delayReissue.type, delayReissueSaga);
  yield takeEvery(validateToken.type, validateTokenSaga);
}
