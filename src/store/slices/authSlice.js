import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = '';
    },
  },
});

export const { setUsername, logout } = authSlice.actions;

export default authSlice.reducer;
