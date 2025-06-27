import { createSlice } from '@reduxjs/toolkit';

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addSnackbar: (state, action) => {
      state.push({
        key: new Date().getTime(),
        ...action.payload
      });
    },
    removeSnackbar: (state, action) => {
      return state.filter(notification => notification.key !== action.payload);
    }
  }
});

export const notificationsReducer = NotificationsSlice.reducer;
export const { addSnackbar, removeSnackbar } = NotificationsSlice.actions;
