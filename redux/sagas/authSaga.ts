import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fail, pending, signin, signOut, success } from '../reducers/auth';

// const USER_API_URL = 'https://3.39.48.25:8080';

// class UserService {
//   public static async signin(reqData: SigninReqType): Promise<string> {
//     const response = await axios.post(USER_API_URL, reqData);
//     return response.data.token;
//   }

//   public static async signOut(token: string): Promise<void> {
//     await axios.delete(USER_API_URL, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//   }
// }

const LOCAL_STORAGE_TOKEN_KEY_NAME = 'project-matching';

export class TokenService {
  public static get(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }

  public static set(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  }

  public static remove(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }
}

export type SigninReqType = {
  email: string;
  password: string;
};

function* signinSaga({ payload }: PayloadAction<SigninReqType>) {
  try {
    yield put(pending());
    // const token: string = yield call(UserService.signin, payload);
    const token: string = `${payload.email}+${payload.password}`;
    TokenService.set(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  }
}

function* signOutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    // yield call(UserService.signOut, token);
    TokenService.set(token);
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(signin.type, signinSaga);
  yield takeEvery(signOut.type, signOutSaga);
}
