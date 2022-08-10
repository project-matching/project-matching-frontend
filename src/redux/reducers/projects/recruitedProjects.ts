import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectPreviewType } from './../../../services/ProjectService';
import { ProjectState } from './project';

const initialState: ProjectState = {
  loading: false,
  error: null,
  projectList: [],
};

const projectState = 'recruitedProjects';

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
  pending: recruitedProjectPending,
  fail: recruitedProjectFail,
  success: recruitedProjectSuccess,
} = projectSlice.actions;

export const recruitedProjectPreview = createAction(
  `${projectState}/recruitedProjectPreview`
);

export const recruitedProject = createAction<ProjectPreviewType>(
  `${projectState}/recruitedProject`
);

export default projectSlice.reducer;
