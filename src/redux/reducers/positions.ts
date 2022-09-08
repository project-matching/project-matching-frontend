import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PositionType } from 'src/services/PositionService';

interface PositionState {
  loading: boolean;
  error: any;
  loadingAdd: boolean;
  errorAdd: any;
  loadingEdit: boolean;
  errorEdit: any;
  positions: PositionType[] | null;
}

const initialState: PositionState = {
  loading: false,
  error: null,
  loadingAdd: false,
  errorAdd: null,
  loadingEdit: false,
  errorEdit: null,
  positions: null,
};

const positionState = 'position';

const positionSlice = createSlice({
  name: positionState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
      };
    },
    fail(state, action: PayloadAction<PositionState['error']>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    success(state, action: PayloadAction<PositionState['positions']>) {
      return {
        ...state,
        loading: false,
        error: null,
        positions: action.payload,
      };
    },
    pendingAdd(state) {
      return {
        ...state,
        loadingAdd: true,
      };
    },
    failAdd(state, action: PayloadAction<PositionState['errorAdd']>) {
      return {
        ...state,
        loadingAdd: false,
        errorAdd: action.payload,
      };
    },
    successAdd(state) {
      return {
        ...state,
        loadingAdd: false,
        errorAdd: null,
      };
    },
    pendingEdit(state) {
      return {
        ...state,
        loadingEdit: true,
      };
    },
    failEdit(state, action: PayloadAction<PositionState['errorEdit']>) {
      return {
        ...state,
        loadingEdit: false,
        errorEdit: action.payload,
      };
    },
    successEdit(state) {
      return {
        ...state,
        loadingEdit: false,
        errorEdit: null,
      };
    },
  },
});

export const {
  pending: positionPending,
  fail: positionFail,
  success: positionSuccess,
  pendingAdd: positionPendingAdd,
  failAdd: positionFailAdd,
  successAdd: positionSuccessAdd,
  pendingEdit: positionPendingEdit,
  failEdit: positionFailEdit,
  successEdit: positionSuccessEdit,
} = positionSlice.actions;

export const getPositions = createAction(`${positionState}/getPositions`);

export const postPosition = createAction<string>(
  `${positionState}/postPositions`
);

export const putPosition = createAction<PositionType>(
  `${positionState}/putPositions`
);

export default positionSlice.reducer;
