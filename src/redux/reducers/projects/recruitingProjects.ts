import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectRequestType } from './../../../services/ProjectService';

import { ProjectState } from './project';

const initialState: ProjectState = {
  loading: false,
  error: null,
  projectList: [],
};

const projectState = 'recruitingProjects';

const projectSlice = createSlice({
  name: projectState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success(state, action: PayloadAction<ProjectState['projectList']>) {
      return {
        ...state,
        loading: false,
        projectList: action.payload,
        error: null,
      };
    },
    fail(state, action: PayloadAction<ProjectState['error']>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  pending: recruitingProjectPending,
  fail: recruitingProjectFail,
  success: recruitingProjectSuccess,
} = projectSlice.actions;

export const recruitingProjectPreview = createAction(
  `${projectState}/recruitingProjectPreview`
);

export const recruitingProject = createAction<ProjectRequestType>(
  `${projectState}/recruitingProject`
);

export default projectSlice.reducer;
