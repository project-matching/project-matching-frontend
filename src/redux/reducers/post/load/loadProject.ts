import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './type';

export const loadProjectSlice = createSlice({
  name: 'singleProject',
  initialState,
  reducers: {
    loadProjectRequest: (state, _action: PayloadAction<any>) => {
      return {
        ...state,
        loadProjectPending: false,
        loadProjectSuccess: true,
        loadProjectError: null,
      };
    },
    loadProjectSuccess: (state, action: PayloadAction<any>) => {
      console.log(action);
      return {
        ...state,
        loadProjectPending: false,
        loadProjectSuccess: true,
        loadProjectError: null,
        singleProject: action.payload,
      };
    },
    loadProjectError: (state, action: PayloadAction<string | unknown>) => {
      return {
        ...state,
        loadProjectPending: false,
        loadProjectSuccess: false,
        loadProjectError: action.payload,
      };
    },
  },
});

const { reducer, actions } = loadProjectSlice;

export const { loadProjectRequest, loadProjectSuccess, loadProjectError } =
  actions;

export default reducer;
