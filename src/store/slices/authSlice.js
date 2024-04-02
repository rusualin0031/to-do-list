import {createSlice} from '@reduxjs/toolkit';

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
  },
});

// Export the actions
export const {
  setUsername,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;