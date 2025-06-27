import React, { useState } from 'react';
import { Paper, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { login } from '../../features/user/userThunk.js';
import { addSnackbar } from '../../features/notifications/notificationsSlice.js';
import './signIn.css';

const loginSuccessMessage = 'Вы успешно авторизовались!';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { loginLoading } = useAppSelector(state => state.user);
  const [state, setState] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const req = dispatch(login(state));
    const res = await req;
    if (res?.error) {
      dispatch(addSnackbar({ message: res.payload.message, type: 'error' }));
    } else dispatch(addSnackbar({ message: loginSuccessMessage, type: 'info' }));
  };

  return (
    <div className='sign-in'>
      <Paper className='sign-in-paper' elevation={5}>
        <form onSubmit={onSubmit}>
          <Typography variant='h5' component='h5' sx={{ margin: '0 auto 5px' }}>
            Авторизоваться
          </Typography>
          <TextField
            required
            fullWidth
            name='username'
            label='Логин'
            autoComplete='off'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            value={state?.login}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            autoComplete='off'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            value={state?.password}
            onChange={handleChange}
          />
          <LoadingButton
            type='submit'
            variant='contained'
            loading={loginLoading}
          >
            Войти
          </LoadingButton>
        </form>
      </Paper>
    </div>
  );
};

export default SignIn;
