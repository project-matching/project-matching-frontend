import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SigninReqType } from 'redux/sagas/authSaga';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const authState = 'auth';

const authSlice = createSlice({
  name: authState,
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success(state, action: PayloadAction<AuthState['token']>) {
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: null,
      };
    },
    fail(state, action: PayloadAction<AuthState['error']>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { pending, success, fail } = authSlice.actions;

export const signin = createAction<PayloadAction<SigninReqType>>(
  `${authState}/signin`
);
export const signOut = createAction(`${authState}/signOut`);

export default authSlice.reducer;
