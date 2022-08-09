import { call, put, takeLatest } from 'redux-saga/effects';
import { authSuccess } from 'src/redux/reducers/auth';
import {
  initUserInfo,
  updateUserInfo,
  userFail,
  UserInfoType,
  userPending,
  userSuccess,
} from 'src/redux/reducers/users';
import { TokenService } from 'src/services/TokenService';
import { UserService } from 'src/services/UserService';

function* updateUserInfoSaga() {
  try {
    yield put(userPending());
    const token = TokenService.get();
    const userInfo: UserInfoType = yield call(UserService.getUserInfo);

    yield put(userSuccess(userInfo));
    yield put(authSuccess(token));
  } catch (error: any) {
    yield put(
      userFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    TokenService.remove();
    yield put(userSuccess(initUserInfo));
    yield put(authSuccess(null));
  }
}

export function* userSaga() {
  yield takeLatest(updateUserInfo.type, updateUserInfoSaga);
}
