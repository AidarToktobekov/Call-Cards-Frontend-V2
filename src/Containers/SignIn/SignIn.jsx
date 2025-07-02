import React, {useEffect, useState} from 'react';
import {Button, Fade, Grid, Paper, TextField, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.js';
import {login} from '../../features/user/userThunk.js';
import {addSnackbar} from '../../features/notifications/notificationsSlice.js';
import './signIn.css';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const loginSuccessMessage = 'Вы успешно авторизовались!';
const icons = [LockOutlineIcon, VpnKeyIcon, LockOpenIcon];

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { loginLoading } = useAppSelector(state => state.user);
  const [state, setState] = useState(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const CurrentIcon = icons[index];

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
          <Grid
            sx={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgb(0,0,0)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              position: "relative",
            }}
          >
            <Fade in key={index} style={{ transitionDuration: "1.5s"}}>
              <CurrentIcon sx={{ fontSize: '40px', position: 'absolute' }} />
            </Fade>
          </Grid>
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
            value={state?.password || ""}
            onChange={handleChange}
          />
          <Button
            type='submit'
            variant='contained'
            loading={loginLoading}
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              fontWeight: '500',
              fontSize: '18px'
            }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignIn;
