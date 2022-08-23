import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SigninReqType, SignupReqType } from 'src/redux/sagas/authSaga';

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
export const signinOAuth = createAction<string>(`${authState}/signinOAuth`);
export const signOut = createAction(`${authState}/signOut`);

export default authSlice.reducer;
