import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ProjectDtoType } from 'src/redux/reducers/projects/project';
import {
  recruitedProject,
  recruitedProjectFail,
  recruitedProjectPending,
  recruitedProjectPreview,
  recruitedProjectSuccess,
} from '../reducers/projects/recruitedProjects';
import {
  recruitingProject,
  recruitingProjectFail,
  recruitingProjectPending,
  recruitingProjectPreview,
  recruitingProjectSuccess,
} from '../reducers/projects/recruitingProjects';
import {
  ProjectRequestType,
  ProjectService,
} from './../../services/ProjectService';

function* recruitingProjectPreviewSaga() {
  try {
    yield put(recruitingProjectPending());
    const projectList: ProjectDtoType[] = yield call(
      ProjectService.recruitingProjectPreview
    );
    yield put(recruitingProjectSuccess(projectList));
  } catch (error: any) {
    yield;
    put(
      recruitingProjectFail(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* recruitedProjectPreviewSaga() {
  try {
    yield put(recruitedProjectPending());
    const projectList: ProjectDtoType[] = yield call(
      ProjectService.recruitedProjectPreview
    );
    yield put(recruitedProjectSuccess(projectList));
  } catch (error: any) {
    yield put(
      recruitedProjectFail(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* recruitingProjectSaga({
  payload,
}: PayloadAction<ProjectRequestType>) {
  try {
    yield put(recruitingProjectPending());
    const projectList: ProjectDtoType[] = yield call(
      ProjectService.recruitingProject,
      payload
    );
    yield put(recruitingProjectSuccess(projectList));
  } catch (error: any) {
    yield;
    put(
      recruitingProjectFail(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

function* recruitedProjectSaga({ payload }: PayloadAction<ProjectRequestType>) {
  try {
    yield put(recruitedProjectPending());
    const projectList: ProjectDtoType[] = yield call(
      ProjectService.recruitedProject,
      payload
    );
    yield put(recruitedProjectSuccess(projectList));
  } catch (error: any) {
    yield put(
      recruitedProjectFail(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
  }
}

export function* projectSaga() {
  yield takeEvery(recruitingProjectPreview.type, recruitingProjectPreviewSaga);
  yield takeEvery(recruitedProjectPreview.type, recruitedProjectPreviewSaga);
  yield takeEvery(recruitingProject.type, recruitingProjectSaga);
  yield takeEvery(recruitedProject.type, recruitedProjectSaga);
}
