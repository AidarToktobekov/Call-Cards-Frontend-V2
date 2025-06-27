import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { Alert, Snackbar } from '@mui/material';
import { removeSnackbar } from '../../features/notifications/notificationsSlice.js';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.notifications);

  const handleClose = (event, reason, key) => {
    // if (reason === 'clickaway') return;
    dispatch(removeSnackbar(key));
  };

  return (
    <>
      {notifications.map(notification => (
        <Snackbar
          key={notification.key}
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={(event, reason) =>
            handleClose(event, reason, notification.key)
          }
        >
          <Alert
            className='global-alert'
            onClose={event => handleClose(event, 'close', notification.key)}
            severity={notification.type}
            variant='filled'
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Notifications;
