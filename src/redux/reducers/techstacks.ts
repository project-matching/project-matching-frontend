import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TechStackSendType } from 'src/services/TechStackService';

export interface TechStackType {
  technicalStackName: string;
  technicalStackNo: number;
  image: string;
}

interface TechStackState {
  loading: boolean;
  error: any;
  loadingAdd: boolean;
  errorAdd: any;
  loadingEdit: boolean;
  errorEdit: any;
  techstacks: TechStackType[] | null;
}

const initialState: TechStackState = {
  loading: false,
  error: null,
  loadingAdd: false,
  errorAdd: null,
  loadingEdit: false,
  errorEdit: null,
  techstacks: null,
};

const techstackState = 'techstack';

const techstackSlice = createSlice({
  name: techstackState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
      };
    },
    fail(state, action: PayloadAction<TechStackState['error']>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    success(state, action: PayloadAction<TechStackState['techstacks']>) {
      return {
        ...state,
        loading: false,
        error: null,
        techstacks: action.payload,
      };
    },
    pendingAdd(state) {
      return {
        ...state,
        loadingAdd: true,
      };
    },
    failAdd(state, action: PayloadAction<TechStackState['errorAdd']>) {
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
    failEdit(state, action: PayloadAction<TechStackState['errorEdit']>) {
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
  pending: techstackPending,
  fail: techstackFail,
  success: techstackSuccess,
  pendingAdd: techstackPendingAdd,
  failAdd: techstackFailAdd,
  successAdd: techstackSuccessAdd,
  pendingEdit: techstackPendingEdit,
  failEdit: techstackFailEdit,
  successEdit: techstackSuccessEdit,
} = techstackSlice.actions;

export const getTechStacks = createAction(`${techstackState}/getTechStacks`);

export const postTechStack = createAction<FormData>(
  `${techstackState}/postTechStacks`
);

export const putTechStack = createAction<TechStackSendType>(
  `${techstackState}/putTechStacks`
);

export default techstackSlice.reducer;
