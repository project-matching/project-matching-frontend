import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './type';

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    loadPositionRequest: (state) => {
      return {
        ...state,
        loadPositionPending: true,
        loadPositionSuccess: false,
        loadPositionError: null,
      };
    },
    loadPositionSuccess: (state, action: PayloadAction<any>) => {
      console.log(action);
      return {
        ...state,
        loadPositionPending: false,
        loadPositionSuccess: true,
        loadPositionError: null,
        positionList: action.payload,
      };
    },
    loadPositionError: (state, action: PayloadAction<string | unknown>) => {
      return {
        ...state,
        loadPositionPending: false,
        loadPositionSuccess: false,
        loadPositionError: action.payload,
      };
    },
  },
});

const { reducer, actions } = positionSlice;

export const { loadPositionRequest, loadPositionSuccess, loadPositionError } =
  actions;

export default reducer;
