import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import postSaga from './post';
import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(postSaga)]); // [fork(saga1), fork(saga2)]
}
