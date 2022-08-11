import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import loadPositionSaga from './position/loadPositionsSaga';
import createSaga from './project/createSaga';
import loadProjectSaga from './project/loadProjectSaga';
import loadTechSaga from './tech/loadTechSaga';
import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(createSaga),
    fork(loadProjectSaga),
    fork(loadPositionSaga),
    fork(loadTechSaga),
  ]); // [fork(saga1), fork(saga2)]
}
