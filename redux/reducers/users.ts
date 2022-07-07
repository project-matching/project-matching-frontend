import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
      return {
        ...state,
        username: 'true',
      };
    },
    signOut: (state) => {
      return {
        ...state,
        username: null,
      };
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
