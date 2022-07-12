import { call, put, takeLatest } from 'redux-saga/effects';
import { authSuccess } from 'redux/reducers/auth';
import {
  getUserInfo,
  userFail,
  userPending,
  userSuccess,
} from 'redux/reducers/users';
import { TokenService } from 'services/TokenService';
import { UserService } from 'services/UserService';

export type UserInfoType =
  | {
      no: number | null;
      profile: string | null;
      name: string | null;
      email: string | null;
    }
  | string;

function* getUserInfoSaga() {
  try {
    yield put(userPending());
    const token = TokenService.get();
    const userInfo: UserInfoType = yield call(UserService.getUserInfo, token);
    if (typeof userInfo === 'string') {
      TokenService.remove();
      yield put(userSuccess(null));
    } else {
      yield put(userSuccess(userInfo));
      yield put(authSuccess(token));
    }
  } catch (error: any) {
    yield put(
      userFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
  }
}

export function* userSaga() {
  yield takeLatest(getUserInfo.type, getUserInfoSaga);
}
