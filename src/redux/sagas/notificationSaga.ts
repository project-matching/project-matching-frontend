import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { closeModal } from '../reducers/components/modals';
import {
  notificationDetail,
  notificationFail,
  notificationPending,
  notificationSuccess,
} from '../reducers/notification';
import { NotificationService } from './../../services/NotificationService';
import { notificationStateType } from './../reducers/notification';

function* notificationDetailSaga({ payload }: PayloadAction<number>) {
  try {
    yield put(notificationPending());
    const notificationDetail: notificationStateType['notificationDetail'] =
      yield call(NotificationService.getNotificationDetail, payload);
    yield put(notificationSuccess(notificationDetail));
  } catch (error: any) {
    yield put(
      notificationFail(
        new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
      )
    );
    yield put(closeModal('NotificationModal'));
  }
}

export function* notificationSaga() {
  yield takeLatest(notificationDetail.type, notificationDetailSaga);
}
