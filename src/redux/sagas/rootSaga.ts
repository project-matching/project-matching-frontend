import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { positionSaga } from './positionSaga';
import postSaga from './post';
import { techstackSaga } from './techstackSaga';
import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(postSaga),
    fork(positionSaga),
    fork(techstackSaga),
  ]); // [fork(saga1), fork(saga2)]
}
