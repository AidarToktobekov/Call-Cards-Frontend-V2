import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import {memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.js';
import {addSnackbar} from "../../features/notifications/notificationsSlice.js";
import {useFetchClient} from "../ContentHeader/hooks.js";
import {useCreateCards} from "./hooks.js";
import {useFetchFilterData} from "../../globalHooks.js";

const CreateCard = ({client, handleClose}) => {
  const user = useAppSelector(state => state.user.user);
  const {reasons, reasonsLoading, solutions, solutionsLoading, fetchFilterData} = useFetchFilterData();
  const {cardLoading, createCards } = useCreateCards();
  const { resetClient} = useFetchClient();
  const [modalClient, setModalClient] = useState(client);
  const dispatch = useAppDispatch();
  const [filteredSolution, setFilteredSolution] = useState([
    {
      id: 'placeholder',
      title: 'Выберите причину',
    },
  ]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setModalClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChangeHandler = (name, value) => {
    if (value?.id !== 'placeholder') {
      setModalClient((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
      void fetchFilterData();
  }, [fetchFilterData]);

  useEffect(() => {
    setModalClient(client)
  }, [client]);

  useEffect(() => {
    if (modalClient?.reason?.id) {
      const newSolutions = [];
      solutions.map((item) => {
        if (modalClient?.reason?.id && modalClient?.reason?.id === item?.reason?.id) {
          newSolutions.push(item);
        }
      });
      if (newSolutions.length > 0) {
        setFilteredSolution(newSolutions);
      }
    } else {
      setModalClient((prevState) => ({
        ...prevState,
        solution: null,
      }));
      setFilteredSolution([
        {
          id: 'placeholder',
          title: 'Выберите причину',
        },
      ]);
    }}, [modalClient?.reason, solutions]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (user) {
      const cardMutation = {
        ls_abon: modalClient?.ls_abon,
        phone_number: modalClient?.phone_number,
        sip: user.sip,
        spec_full_name: user?.name,
        full_name: modalClient?.full_name,
        call_from: modalClient?.call_from,
        address: modalClient?.address,
        reason_id: modalClient?.reason?.id,
        solution_id: modalClient?.solution?.id,
        comment: modalClient?.comment?.trim(),
        ip_address: modalClient?.ip_address,
        mac_address: modalClient?.mac_address,
        ip_olt: modalClient?.ip_olt,
        mac_onu: modalClient?.mac_onu,
        account_id: `${modalClient?.account_id}`,
        n_result_id: `${modalClient?.n_result_id}`,
        set_credit: !!modalClient?.credit,
      };
      await createCards(cardMutation);
      await setModalClient(null);
      await resetClient();
      handleClose();
    } else {
      dispatch(addSnackbar({
        type: "error",
        message: "Зарегестрируйтесь?",
      }))
    }
  };


  return (
      <>
        <Typography variant={"h3"} sx={{
          textAlign: 'center',
          fontSize: '26px',
          my: 2,
        }}>
          Создать карточку
        </Typography>
        <Grid component={"form"} onSubmit={submitFormHandler} sx={{
          width: '100%',
          maxWidth: '1000px',
          minWidth: '600px',
          maxHeight: '640px',
          overflowY: 'auto',
          padding: '10px',
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateAreas: client?.ls_abon ? `
            'full_name full_name'
            'ls_abon address'
            'phone_number phone_number'
            'mac_address ip_address'
            'mac_onu ip_olt'
            'call_from save_call_from'
            'reason solution'
            'comment comment'
            'credit credit'
            'button button'
           ` : `
            'full_name full_name'
            'ls_abon address'
            'call_from call_from'
            'reason solution'
            'comment comment'
            'button button'
           `
          ,
          gap: '10px',
        }}>
          {client?.ls_abon ? (
            <TextField variant={"filled"} value={modalClient?.full_name} label={"ФИО"} fullWidth sx={{
              gridArea: "full_name",
            }} inputProps={{
              style: {textAlign: 'center'}
            }}/>
          ) : (
              <TextField variant={"filled"} value={modalClient?.full_name || ""} label={"ФИО"} name={"full_name"} onChange={inputChangeHandler} fullWidth sx={{
                gridArea: "full_name",

              }} inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}
          {client?.ls_abon ? (
            <TextField variant={"filled"} value={modalClient?.ls_abon} sx={{
              gridArea: "ls_abon",
            }} label={"Лицевой счет"} fullWidth inputProps={{
              style: {textAlign: 'center'}
            }}/>
          ):(
              <TextField variant={"filled"} value={modalClient?.ls_abon || ""} label={"Лицевой счет"} sx={{
                gridArea: "ls_abon",
              }} name={"ls_abon"} onChange={inputChangeHandler} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}
           {client?.ls_abon ? (
            <TextField variant={"filled"} value={modalClient?.address} sx={{
              gridArea: "address",
            }} label={"Адрес"} fullWidth inputProps={{
             style: {textAlign: 'center'}
            }}/>
          ) : (
              <TextField variant={"filled"} value={modalClient?.address || ""} name={"address"} label={"Адрес"} onChange={inputChangeHandler} sx={{
                gridArea: "address",

              }} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
           )}
          {client?.ls_abon && (
            <Autocomplete
                fullWidth
                required
                multiple
                options={modalClient?.phone_number}
                value={
                  Array.isArray(modalClient?.phone_number) ? modalClient.phone_number : []
                }
                disableClearable
                readOnly
                renderInput={(params) => (
                    <TextField {...params} label={'Номера'}></TextField>
                )}
                sx={{
                  gridArea: "phone_number",

                }}
            />
          )}
          {client?.ls_abon && (
              <TextField variant={"filled"} sx={{
                gridArea: "mac_address",
              }} value={modalClient?.mac_address} label={"Мак роутера"} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}
          {client?.ls_abon && (
              <TextField variant={"filled"} sx={{
                gridArea: "ip_address",
              }} value={modalClient?.ip_address} label={"Айпи адрес"} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}
          {client?.ls_abon && (
               <TextField variant={"filled"} sx={{
                 gridArea: "mac_onu",
               }} value={""} label={"Mac onu"} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}
          {client?.ls_abon && (
              <TextField variant={"filled"} value={""} label={"IP OLT"} sx={{
                gridArea: "ip_olt",
              }} fullWidth inputProps={{
                style: {textAlign: 'center'}
              }}/>
          )}

          <TextField variant={"filled"} value={modalClient?.call_from || ""} onChange={inputChangeHandler} name={"call_from"} label={"Номер с которого звонили"} sx={{
            gridArea: "call_from",

          }} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          {client?.ls_abon && (
            <FormControlLabel
                sx={{
                  gridArea: "save_call_from",
                }}
                value="end"
                control={
                  <Switch
                      checked={!!modalClient?.save_call_from}
                      color="primary"
                      onChange={(_, value) =>
                          inputChangeHandler({
                            target: {
                              name: 'save_call_from',
                              value,
                            },
                          })
                      }
                  />
                } label="Сохранить в Гидре номер с которого звонили" labelPlacement="end"/>
          )}
          {client?.ls_abon && (
            <FormControlLabel
              sx={{
                gridArea: "credit",
                justifyContent: 'center',
              }}
              value="end"
              control={
                <Switch
                  checked={!!modalClient?.credit}
                  color="primary"
                  onChange={(_, value) =>
                    inputChangeHandler({
                      target: {
                        name: 'credit',
                        value,
                      },
                    })
                  }
                />
              } label="Выдать кредит?" labelPlacement="end"/>
          )}
          <Autocomplete
              fullWidth
              sx={{
                gridArea: "reason",
              }}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                selectChangeHandler('reason', newValue);
              }}
              value={
                  modalClient?.reason || {
                    id: '',
                    title: '',
                  }
              }
              options={client?.ls_abon ? reasons : reasons.filter(item=>['Callback', 'Желает подключиться', 'Интерком'].includes(item?.title))}
              loading={reasonsLoading}
              renderInput={(params) => (
                  <TextField
                      required
                      {...params}
                      name={'reason'}
                      label={'Причина обращения'}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                              <>
                                {reasonsLoading ? (
                                    <CircularProgress color={'inherit'} size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                          ),
                        },
                      }}
                  />
              )}
          />
          <Autocomplete
              fullWidth
              sx={{
                gridArea: "solution",
              }}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                selectChangeHandler('solution', newValue);
              }}
              value={
                  modalClient?.solution || {
                    id: '',
                    title: '',
                  }
              }
              options={filteredSolution}
              loading={solutionsLoading}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      required
                      name={'solution'}
                      label={'Решение'}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                              <>
                                {solutionsLoading ? (
                                    <CircularProgress color={'inherit'} size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                          ),
                        },
                      }}
                  />
              )}
          />
          <TextField
              label="Комментарий"
              multiline
              onChange={inputChangeHandler}
              sx={{
                // gridColumnStart: client?.ls_abon ? "2" : "1",
                // gridColumnEnd: "3",
                // gridRowStart: client?.ls_abon ? '6' : "3",
                // gridRowEnd: '9',
                // width: '100%',
                gridArea: "comment",

              }}
              name={'comment'}
              value={modalClient?.comment || ''}
          />
          <Button
              variant={'outlined'}
              size="large"
              loading={cardLoading}
              type={'submit'}
              sx={{
                // width: '100%',
                // mt: '15px',
                // gridColumnStart: "1",
                // gridColumnEnd: "3",
                gridArea: "button",

              }}
          >
            Создать
          </Button>
        </Grid>
      </>
  );
};

export default memo(CreateCard);
