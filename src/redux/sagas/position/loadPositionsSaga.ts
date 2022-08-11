import { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  loadPositionError,
  loadPositionRequest,
  loadPositionSuccess,
} from 'src/redux/reducers/position/loadPosition';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';

async function loadPositionAPI() {
  const token = TokenService.get();
  const res = await appApi.get('/position', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

function* loadPosition() {
  try {
    const result: AxiosResponse = yield call(loadPositionAPI);
    console.log(result);
    yield put(loadPositionSuccess(result.data.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadPositionError(err.response?.data));
  }
}

function* sagaLoadPosition() {
  yield takeLatest(loadPositionRequest.type, loadPosition);
}

export default function* loadPositionSaga() {
  yield all([fork(sagaLoadPosition)]);
}
