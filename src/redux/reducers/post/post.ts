import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreatePost, initialState } from './type';

export const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    // 게시글 업로드
    createPostRequest: (state, _action: PayloadAction<ICreatePost>) => {
      state.createPostPending = true;
      state.createPostSuccess = false;
      state.createPostError = null;
    },
    createPostSuccess: (state, action: PayloadAction<any>) => {
      state.createPostPending = false;
      state.createPostSuccess = true;
      state.createPostError = null;
      state.mainPosts.unshift(action.payload);
    },
    createPostError: (state, action: PayloadAction<string | unknown>) => {
      state.createPostPending = false;
      state.createPostSuccess = true;
      state.createPostError = action.payload;
    },

    loadPostRequest: (state, _action: PayloadAction<number>) => {
      state.loadPostPending = true;
      state.loadPostSuccess = false;
      state.loadPostError = null;
    },
    loadPostSuccess: (state, action: PayloadAction<any>) => {
      state.loadPostPending = false;
      state.loadPostSuccess = true;
      state.loadPostError = null;
      state.mainPosts.unshift(action.payload);
    },
    loadPostError: (state, action: PayloadAction<string | unknown>) => {
      state.loadPostPending = false;
      state.loadPostSuccess = true;
      state.loadPostError = action.payload;
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  createPostRequest,
  createPostSuccess,
  createPostError,
  loadPostRequest,
  loadPostSuccess,
  loadPostError,
} = actions;

export default reducer;
