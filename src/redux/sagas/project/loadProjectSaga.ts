import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  loadProjectError,
  loadProjectRequest,
  loadProjectSuccess,
} from 'src/redux/reducers/post/load/loadProject';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';

async function loadProjectAPI(projectNo: number) {
  const token = TokenService.get();
  const res = await appApi.get(`/project/${projectNo}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

function* loadProject(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(loadProjectAPI, action.payload);
    console.log(result);
    yield put(loadProjectSuccess(result.data.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadProjectError(err.response?.data));
  }
}

function* sagaLoadProject() {
  yield takeLatest(loadProjectRequest.type, loadProject);
}

export default function* loadProjectSaga() {
  yield all([fork(sagaLoadProject)]);
}
