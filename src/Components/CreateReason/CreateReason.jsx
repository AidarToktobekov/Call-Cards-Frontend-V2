import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useCreateReasons} from "../../hooks/reasonsHook.js";

const CreateReason = () => {
  const [reasonTitle, setReasonTitle] = useState('');
  const { reasonLoading, createReasons } = useCreateReasons();

  const handleSubmit = async (e) => {
    e.preventDefault();

    void createReasons({
      title: reasonTitle.trim(),
    });
    setReasonTitle('');
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
          <TextField label={"Причина"} value={reasonTitle} type={"text"} sx={{
            mb: 2
          }} variant={"outlined"} fullWidth onChange={(e) => setReasonTitle(e.target.value)}/>
          <Button sx={{width: '100%'}} variant={"outlined"} disabled={!reasonTitle || reasonLoading} color={"primary"} type={"submit"} loading={reasonLoading}>
            Создать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateReason;