import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, IPropsCreateProject } from './type';

export const postSlice = createSlice({
  name: 'Project',
  initialState,
  reducers: {
    // 게시글 업로드
    createProjectRequest: (
      state,
      _action: PayloadAction<IPropsCreateProject>
    ) => {
      return {
        ...state,
        createProjectPending: true,
        createProjectSuccess: false,
        createProjectError: null,
      };
    },
    createProjectSuccess: (state, _action: PayloadAction<any>) => {
      return {
        ...state,
        createProjectPending: false,
        createProjectSuccess: true,
        createProjectError: null,
      };
    },
    createProjectError: (state, action: PayloadAction<string | unknown>) => {
      return {
        ...state,
        createProjectPending: false,
        createProjectSuccess: true,
        createProjectError: action.payload,
      };
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  createProjectRequest,
  createProjectSuccess,
  createProjectError,
} = actions;

export default reducer;
