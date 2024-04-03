import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUsername, logout } = authSlice.actions;

export default authSlice.reducer;
