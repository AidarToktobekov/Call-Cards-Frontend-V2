import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../app/hooks.js';
import {useFetchReasons} from "../../hooks/reasonsHook.js";
import {useFetchSolutions} from "../../hooks/solutionsHook.js";
import {useCreateCards} from "../../hooks/cardsHook.js";
import {useFetchClient} from "../../hooks/clientsHook.js";

const CreateCard = ({client}) => {
  const user = useAppSelector(state => state.user.user);
  const {reasons, reasonsLoading, fetchReasons} = useFetchReasons();
  const {solutions, solutionsLoading, fetchSolutions} = useFetchSolutions();
  const {  cardLoading, createCards } = useCreateCards();
  const { resetClient} = useFetchClient();
  const [modalClient, setModalClient] = useState(client);
  const [filteredSolution, setFilteredSolution] = useState([
    {
      id: 'placeholder',
      title: 'Выберите причину',
    },
  ]);
  const [error, setError] = useState('');

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (
        ['ls_abon', 'full_name', 'address'].includes(name) &&
        modalClient?.reason?.title !== 'Интерком' &&
        modalClient?.reason?.title !== 'Желает подключиться'
    )
      return;

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
    const fetchData = async () => {
      try {
        await fetchReasons();
        await fetchSolutions();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [fetchReasons, fetchSolutions]);

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
      };
      await createCards(cardMutation);
      await setModalClient(null);
      await resetClient();
    } else {
      setError('Зарегстрируйтесь!');
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
        {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
        )}
        <Grid component={"form"} onSubmit={submitFormHandler} sx={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '620px',
          overflowY: 'auto',
          padding: '10px',
          display: "grid",
          gridTemplateColumns: "calc(50% - 5px) calc(50% - 5px)",
          gap: '10px',
        }}>
          <TextField variant={"filled"} value={modalClient?.full_name} label={"ФИО"} fullWidth sx={{
            gridColumnStart: "1",
            gridColumnEnd: "3",
          }} inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={modalClient?.ls_abon} label={"Лицевой счет"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={modalClient?.address} label={"Адрес"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
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
                gridColumnStart: "1",
                gridColumnEnd: "3",
              }}
          />
          <TextField variant={"filled"} value={modalClient?.mac_address} label={"Мак роутера"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={modalClient?.ip_address} label={"Айпи адрес"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={""} label={"Mac onu"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={""} label={"IP OLT"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <TextField variant={"filled"} value={modalClient?.call_from} label={"Номер с которого звонили"} fullWidth inputProps={{
            style: {textAlign: 'center'}
          }}/>
          <FormControlLabel
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
          <Autocomplete
              fullWidth
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
              options={reasons}
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
              minRows={3}
              multiline
              onChange={inputChangeHandler}
              sx={{
                gridColumnStart: "2",
                gridColumnEnd: "3",
                gridRowStart: '7',
                gridRowEnd: '9',
                width: '100%',
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
                width: '100%',
                mt: '15px',
                gridColumnStart: "1",
                gridColumnEnd: "3",
              }}
          >
            Создать
          </Button>
        </Grid>
      </>
  );
};

export default CreateCard;
