import { createAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  position: string | null;
}

const initialState: UserState = {
  username: null,
  position: null,
};

const userState = 'user';

const userSlice = createSlice({
  name: userState,
  initialState,
  reducers: {
    setUserInfo: (state, actions) => {
      return {
        ...state,
        username: actions.payload.username,
        position: actions.payload.position,
      };
    },
    resetUserInfo: (state) => {
      return {
        ...state,
        username: null,
        position: null,
      };
    },
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;

export const getUserInfo = createAction(`${userState}/getUserInfo`);

export default userSlice.reducer;
