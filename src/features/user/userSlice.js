import { createSlice } from '@reduxjs/toolkit';
import {
  editEmployees,
  login,
  register,
} from './userThunk';

const initialState = {
  user: null,
  loginLoading: false,
  loginError: null,
  registerError: null,
  registerLoading: false,
  editEmployeeLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: res }) => {
      state.user = {
        id: res.id,
        username: res.username,
        name: res.full_name,
        role: res.role,
        sip: res.sip,
        phone_number: res.phone_number,
        token: res.token,
      };
      state.loginLoading = false;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginError = error;
      state.loginLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerError = error;
      state.registerLoading = false;
    });
    builder.addCase(editEmployees.pending, (state) => {
      state.editEmployeeLoading = true;
    });
    builder.addCase(editEmployees.fulfilled, (state) => {
      state.editEmployeeLoading = false;
    });
    builder.addCase(editEmployees.rejected, (state) => {
      state.editEmployeeLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { logout } = UsersSlice.actions;
