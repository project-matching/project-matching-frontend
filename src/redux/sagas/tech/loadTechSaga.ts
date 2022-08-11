import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  loadTechError,
  loadTechRequest,
  loadTechSuccess,
} from 'src/redux/reducers/tech/loadTech';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';

async function loadTechAPI() {
  const token = TokenService.get();
  const res = await appApi.get('/technicalStack', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

function* loadTech(_action: PayloadAction) {
  try {
    const result: AxiosResponse = yield call(loadTechAPI);
    yield put(loadTechSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadTechError(err.name));
  }
}

function* sagaLoadTech() {
  yield takeLatest(loadTechRequest.type, loadTech);
}

export default function* loadTechSaga() {
  yield all([fork(sagaLoadTech)]);
}
