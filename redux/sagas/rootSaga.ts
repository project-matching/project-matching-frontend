import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga)]); // [fork(saga1), fork(saga2)]
}
