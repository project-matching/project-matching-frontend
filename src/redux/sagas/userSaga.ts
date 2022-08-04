import { call, put, takeLatest } from 'redux-saga/effects';
import { authSuccess } from 'src/redux/reducers/auth';
import {
  updateUserInfo,
  userFail,
  userPending,
  userSuccess,
} from 'src/redux/reducers/users';
import { TokenService } from 'src/services/TokenService';
import { UserService } from 'src/services/UserService';

export type UserInfoType = {
  no: number | null;
  role: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  position: string | null;
  technicalStackDtoList: string[] | null;
} | null;

function* updateUserInfoSaga() {
  try {
    yield put(userPending());
    const token = TokenService.get();
    const userInfo: UserInfoType = yield call(UserService.getUserInfo);
    if (!userInfo) {
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
  yield takeLatest(updateUserInfo.type, updateUserInfoSaga);
}
