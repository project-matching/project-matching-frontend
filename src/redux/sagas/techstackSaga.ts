import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  TechStackSendType,
  TechStackService,
} from 'src/services/TechStackService';
import {
  getTechStacks,
  postTechStack,
  putTechStack,
  techstackFail,
  techstackFailAdd,
  techstackFailEdit,
  techstackPending,
  techstackPendingAdd,
  techstackPendingEdit,
  techstackSuccess,
  techstackSuccessAdd,
  techstackSuccessEdit,
  TechStackType,
} from '../reducers/techstacks';

function* getTechStackListSaga() {
  try {
    yield put(techstackPending());
    const techstack: TechStackType[] = yield call(
      TechStackService.getTechStacks
    );
    yield put(techstackSuccess(techstack));
  } catch (error: any) {
    yield put(
      techstackFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    alert('기술 스택을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

function* addTechStackSaga({ payload }: PayloadAction<FormData>) {
  try {
    yield put(techstackPendingAdd());
    yield call(TechStackService.addTechStack, payload);
    yield put(getTechStacks());
    yield put(techstackSuccessAdd());
  } catch (error: any) {
    yield put(techstackFailAdd(new Error(error || 'UNKNOWN_ERROR')));
    alert('기술 스택을 추가할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

function* editTechStackSaga({ payload }: PayloadAction<TechStackSendType>) {
  try {
    yield put(techstackPendingEdit());
    yield call(TechStackService.editTechStack, payload);
    yield put(getTechStacks());
    yield put(techstackSuccessEdit());
  } catch (error: any) {
    yield put(techstackFailEdit(new Error(error || 'UNKNOWN_ERROR')));
    alert('기술 스택을 수정할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

export function* techstackSaga() {
  yield takeLatest(getTechStacks.type, getTechStackListSaga);
  yield takeLatest(postTechStack.type, addTechStackSaga);
  yield takeLatest(putTechStack.type, editTechStackSaga);
}
