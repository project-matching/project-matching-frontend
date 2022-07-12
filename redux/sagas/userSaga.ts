import { put, takeLatest } from 'redux-saga/effects';
import { getUserInfo, setUserInfo } from 'redux/reducers/users';

function* getUserInfoSaga() {
  try {
    // const token = TokenService.get();
    // const userInfo = yield call(UserService.getUserInfo, token);
    const userInfo = {
      username: 'Olivia',
      posiiton: 'frontend',
    };

    yield put(setUserInfo(userInfo));
  } catch (error: any) {
    // TODO: 토큰 만료 시 작동
    // yield put(fail);
  }
}

export function* userSaga() {
  yield takeLatest(getUserInfo.type, getUserInfoSaga);
}
