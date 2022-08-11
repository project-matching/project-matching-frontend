import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';
import {
  createProjectError,
  createProjectRequest,
  createProjectSuccess,
} from '../../reducers/post/create/createProject';

import { IPropsCreateProject } from '../../reducers/post/type';

async function createProjectAPI(data: IPropsCreateProject) {
  console.log(data);
  const token = TokenService.get();
  const res = await appApi.post('/project', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

function* createProject(action: PayloadAction<IPropsCreateProject>) {
  try {
    const result: AxiosResponse = yield call(createProjectAPI, action.payload);
    yield put(createProjectSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(createProjectError(err.response?.data));
  }
}

function* sagaCreatePost() {
  yield takeLatest(createProjectRequest.type, createProject);
}

export default function* postSaga() {
  yield all([fork(sagaCreatePost)]);
}
