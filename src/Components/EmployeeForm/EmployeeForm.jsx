import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {editEmployees, register} from '../../features/user/userThunk.js';
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import {useFetchCardsByEmployees} from "../../Containers/Employees/hooks.js";

const EmployeeForm = ({id}) => {
  const dispatch = useAppDispatch();
  const {registerLoading, editEmployeeLoading} = useAppSelector(state=>state.user);
  const { fetchEmployeeForEdit, employee, employeeForEditLoading } = useFetchCardsByEmployees();
  const [state, setState] = useState({
    username: '',
    name: '',
    phone_number: '+996',
    password: '',
    confirmPassword: '',
    sip: '',
    role: '',
  });

  useEffect(() => {
    if (id) {
      void fetchEmployeeForEdit(id);
    }
    return () => setState(null);
  }, [id, fetchEmployeeForEdit]);

  useEffect(() => {
    setState({
      username: employee?.username || "",
      name: employee?.full_name || "",
      phone_number: employee?.phone_number || '+996',
      password: '',
      confirmPassword: '',
      sip: employee?.sip || "",
      role: employee?.role || "",
    })
  }, [employee]);


  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name !== 'phone_number') {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      if (value.trim().length >= 4) {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const userMutation = {
        username: state.username.trim(),
        full_name: state.name.trim(),
        sip: state.sip.trim(),
        role: state.role,
        phone_number: state.phone_number.trim(),
        password: state.password.trim(),
      };

      if (id){
        await dispatch(editEmployees({id, ...userMutation})).unwrap();
      }else {
        await dispatch(register(userMutation)).unwrap();
      }
      dispatch(addSnackbar({
        type: 'success',
        message: `Пользователь ${userMutation.full_name} сохранен!`,
      }));
    } catch (e) {
      dispatch(addSnackbar({
        type: 'error',
        message: e.message,
      }));
      console.log(e);
    }
  };

  return (
    <Stack sx={{ width: '100%' }} textAlign="center">
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px',
            width: '100%',
            minWidth: '500px',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {id ? "Редактирование пользователя" : "Регистрация"}

            {employeeForEditLoading && <span><CircularProgress/></span>}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitFormHandler}
            sx={{
              mt: 3,
              width: '100%',
              mx: 'auto',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid>
                <TextField
                  required
                  type="text"
                  label="Логин"
                  name="username"
                  autoComplete="new-username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="text"
                  label="ФИО"
                  name="name"
                  autoComplete="new-name"
                  value={state.name}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="text"
                  label="СИП"
                  name="sip"
                  autoComplete="new-sip"
                  value={state.sip}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  select
                  type="text"
                  label="Роль"
                  name="role"
                  autoComplete="new-role"
                  value={state.role}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                >
                  <MenuItem value={'user'}>Пользователь</MenuItem>
                  <MenuItem value={'admin'}>Администратор</MenuItem>
                  <MenuItem value={'senior_spec'}>Старший специалист</MenuItem>
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  type="tel"
                  label="Phone number"
                  name="phone_number"
                  autoComplete="new-phone_number"
                  value={state.phone_number}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="password"
                  label="Пароль"
                  name="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              loading={registerLoading || editEmployeeLoading}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default EmployeeForm;