import { store } from './app/store.js/';
import { addSnackbar } from './features/notifications/notificationsSlice.js';

export const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text);
    store.dispatch(
      addSnackbar({ type: 'success', message: 'Номер телефона скопирован' })
    );
  } catch {
    store.dispatch(
      addSnackbar({
        type: 'error',
        message: 'Не удалось скопировать номер телефона'
      })
    );
  }
};
