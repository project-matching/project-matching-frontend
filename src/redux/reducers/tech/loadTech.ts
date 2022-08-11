import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './type';

export const positionSlice = createSlice({
  name: 'Tech',
  initialState,
  reducers: {
    loadTechRequest: (state, _action: PayloadAction) => {
      return {
        ...state,
        loadTechPending: true,
        loadTechSuccess: false,
        loadTechError: null,
      };
    },
    loadTechSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loadTechPending: false,
        loadTechSuccess: true,
        loadTechError: null,
        techList: action.payload,
      };
    },
    loadTechError: (state, action: PayloadAction<string | unknown | null>) => {
      return {
        ...state,
        loadTechPending: false,
        loadTechSuccess: false,
        loadTechError: action.payload,
      };
    },
  },
});

const { reducer, actions } = positionSlice;

export const { loadTechRequest, loadTechSuccess, loadTechError } = actions;

export default reducer;
