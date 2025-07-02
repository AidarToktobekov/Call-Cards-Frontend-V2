import {Button, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useCreateSolution} from "../../hooks/solutionsHook.js";
import {useFetchReasons} from "../../hooks/reasonsHook.js";

const CreateSolution = () => {
  const [state, setState] = useState({
    title: '',
    reason_id: '',
  });
  const { solutionLoading, createSolutions } = useCreateSolution();
  const { reasons, reasonsLoading, fetchReasons } = useFetchReasons();

  useEffect(() => {
    void fetchReasons();
  }, [fetchReasons]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    void createSolutions({
      title: state.title.trim(),
      reason_id: state.reason_id,
    });
    setState({
      title: '',
      reason_id: '',
    });
  }

  return(
    <>
      <Grid>
        <Typography variant={"h3"} sx={{
          textAlign: 'center',
          fontSize: '26px',
          my: 2,
        }}>
          Создать причину
        </Typography>
        <Grid component={'form'} onSubmit={handleSubmit}>
          <TextField label={"Причина"} value={state.title} type={"text"} sx={{
            mb: 2
          }} variant={"outlined"} fullWidth onChange={(e) => setState(prev=>({
            ...prev,
            title: e.target.value,
          }))}/>

          <TextField
            select
            type="text"
            label="Выберите причину"
            name="reason_id"
            autoComplete="new-reason-title"
            value={state.reason_id}
            sx={{
              width: '100%',
              mb: 2
            }}
            onChange={inputChangeHandler}
          >
            {reasonsLoading ? (
              <Grid
                sx={{ padding: '10px' }}
                container
                justifyContent={'center'}
              >
                <CircularProgress />
              </Grid>
            ) : (
              reasons.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.title}
                  </MenuItem>
                );
              })
            )}
          </TextField>
          <Button sx={{width: '100%'}} variant={"outlined"} disabled={!state.title || !state.reason_id || solutionLoading} color={"primary"} type={"submit"} loading={solutionLoading}>
            Создать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateSolution;