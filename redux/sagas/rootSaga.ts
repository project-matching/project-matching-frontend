import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';

// Todos root saga 분리하기
export default function* rootSaga() {
  yield all([fork(authSaga)]); // [fork(saga1), fork(saga2)]
}
