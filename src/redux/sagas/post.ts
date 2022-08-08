import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  createPostError,
  createPostRequest,
  createPostSuccess,
  loadPostError,
  loadPostRequest,
  loadPostSuccess,
} from '../reducers/post/post';
import { ICreatePost } from '../reducers/post/type';

async function createPostAPI(data: ICreatePost) {
  const res = await axios.post('/project', data);
  return res;
}

function* createPost(action: PayloadAction<ICreatePost>) {
  try {
    const result: AxiosResponse = yield call(createPostAPI, action.payload);
    yield put(createPostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(createPostError(err.response?.data));
  }
}

function* sagaCreatePost() {
  yield takeLatest(createPostRequest.type, createPost);
}

async function loadPostAPI(data: number) {
  const res = await axios.post('/project', data);
  return res;
}

function* loadPost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(loadPostAPI, action.payload);
    yield put(loadPostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadPostError(err.response?.data));
  }
}

function* sagaLoadPost() {
  yield takeLatest(loadPostRequest.type, loadPost);
}

export default function* postSaga() {
  yield all([fork(sagaCreatePost), fork(sagaLoadPost)]);
}
