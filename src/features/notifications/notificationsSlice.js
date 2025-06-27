import { createSlice } from '@reduxjs/toolkit';

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addSnackbar: (state, action) => {
      const newAlert = { key: new Date().getTime(), ...action.payload };
      const existingAlertIndex = state.indexOf(
        notification => notification.type === newAlert.type
      );

      if (existingAlertIndex < 0) {
        state.push(newAlert);
      } else state[existingAlertIndex] = newAlert;
    },
    removeSnackbar: (state, action) => {
      return state.filter(notification => notification.key !== action.payload);
    }
  }
});

export const notificationsReducer = NotificationsSlice.reducer;
export const { addSnackbar, removeSnackbar } = NotificationsSlice.actions;
