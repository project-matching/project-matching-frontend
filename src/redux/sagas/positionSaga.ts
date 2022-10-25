import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PositionService } from 'src/services/PositionService';
import {
  getPositions,
  positionFail,
  positionFailAdd,
  positionFailEdit,
  positionPending,
  positionPendingAdd,
  positionPendingEdit,
  positionSuccess,
  positionSuccessAdd,
  positionSuccessEdit,
  postPosition,
  putPosition,
} from '../reducers/positions';
import { PositionType } from './../../services/PositionService';

function* getPositionListSaga() {
  try {
    yield put(positionPending());
    const positions: PositionType[] = yield call(PositionService.getPositions);
    yield put(positionSuccess(positions));
  } catch (error: any) {
    yield put(
      positionFail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
    );
    alert('포지션을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

function* addPositionSaga({ payload }: PayloadAction<string>) {
  try {
    yield put(positionPendingAdd());
    yield call(PositionService.addPosition, payload);
    yield put(getPositions());
    yield put(positionSuccessAdd());
  } catch (error: any) {
    yield put(
      positionFailAdd(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    alert('포지션을 추가할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

function* editPositionSaga({ payload }: PayloadAction<PositionType>) {
  try {
    yield put(positionPendingEdit());
    yield call(PositionService.editPosition, payload);
    yield put(getPositions());
    yield put(positionSuccessEdit());
  } catch (error: any) {
    yield put(
      positionFailEdit(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    alert('포지션을 수정할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }
}

export function* positionSaga() {
  yield takeLatest(getPositions.type, getPositionListSaga);
  yield takeLatest(postPosition.type, addPositionSaga);
  yield takeLatest(putPosition.type, editPositionSaga);
}
