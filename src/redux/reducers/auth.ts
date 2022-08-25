import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SigninReqType, SignupReqType } from 'src/redux/sagas/authSaga';

interface AuthState {
  token: string | null;
  refresh: string | null;
  loading: boolean;
  error: any;
}

export interface TokenType {
  access: string | null;
  refresh: string | null;
}

const initialState: AuthState = {
  token: null,
  refresh: null,
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
    success(state, action: PayloadAction<TokenType>) {
      return {
        ...state,
        loading: false,
        token: action.payload.access,
        refresh: action.payload.refresh,
        error: null,
      };
    },
    fail(state, action: PayloadAction<AuthState['error']>) {
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      };
    },
  },
});

export const {
  pending: authPending,
  success: authSuccess,
  fail: authFail,
} = authSlice.actions;

export const signin = createAction<SigninReqType>(`${authState}/signin`);
export const signup = createAction<SignupReqType>(`${authState}/signup`);
export const signinOAuth = createAction<TokenType>(`${authState}/signinOAuth`);
export const signOut = createAction(`${authState}/signOut`);

export default authSlice.reducer;
