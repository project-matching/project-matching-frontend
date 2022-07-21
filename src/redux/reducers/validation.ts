import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SigninErrorMsgType {
  email: string;
  password: string;
  auth: string;
}

const signinErrorMsgs: SigninErrorMsgType = {
  email: 'Enter your email',
  password: 'Enter you password',
  auth: 'Wrong email address or password',
};

interface ValidationState {
  signinErrorMsg: string | null;
}

const initialState: ValidationState = {
  signinErrorMsg: null,
};

const validationState = 'validation';

const validationSlice = createSlice({
  name: validationState,
  initialState,
  reducers: {
    setSigninErrorMsg(state, action: PayloadAction<keyof SigninErrorMsgType>) {
      return {
        ...state,
        signinErrorMsg: signinErrorMsgs[action.payload],
      };
    },
    removeSigninErrorMsg(state) {
      return {
        ...state,
        signinErrorMsg: null,
      };
    },
  },
});

export const { setSigninErrorMsg, removeSigninErrorMsg } =
  validationSlice.actions;

export default validationSlice.reducer;
