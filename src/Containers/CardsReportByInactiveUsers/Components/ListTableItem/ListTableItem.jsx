import {Button, Chip, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import {copyToClipboard} from "../../../../utils.js";
import Modal from "../../../../Components/Modal/Modal.jsx";
import React, {useCallback, useState} from "react";
import {useFetchLastPay} from "../../hooks.js";
import dayjs from "dayjs";

const ListTableItem = ({card}) => {

  const { lastPay, lastPayLoading, fetchLastPay } = useFetchLastPay();
  const [open, setOpen] = useState(false);
  const handleClose = ()=> setOpen(false);

  const showLastPay = useCallback(() => {
    setOpen(true);
    void fetchLastPay(card.ls_abon);
  },[fetchLastPay, card.ls_abon]);

  return(
    <React.Fragment>
      <tr>
        <td style={{ textAlign: 'center' }}>{card?.id}</td>
        <td style={{ maxWidth: '240px' }}>{card?.full_name}</td>
        <td style={{ textAlign: 'center' }}>
          {card.call_from ? (
            <Chip
              label={card.call_from}
              onClick={() => copyToClipboard(card.call_from)}
            />
          ) : (
            ''
          )}
        </td>
        <td style={{ textAlign: 'center' }}>{card?.ls_abon}</td>
        <td style={{ maxWidth: '320px', textAlign: 'center' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4px'
            }}
          >
            {card?.phone_number.map((phoneNumber, i) => (
              <Chip
                key={`${phoneNumber}${i}`}
                label={phoneNumber}
                onClick={() => copyToClipboard(phoneNumber)}
              />
            ))}
          </div>
        </td>
        <td style={{ textAlign: 'center' }}>{card?.created_at}</td>
        <td>{card?.reason_title}</td>
        <td>{card?.solution_title}</td>
        <td style={{ textAlign: 'center' }}>{card?.sip}</td>
        <td style={{ minWidth: '160px', maxWidth: '240px' }}>
          {card?.spec_full_name}
        </td>
        <td style={{ minWidth: '180px', maxWidth: '270px' }}>
          {card?.comment}
        </td>
        <td style={{ minWidth: '180px', maxWidth: '270px' }}>
          <Button loading={lastPayLoading} onClick={()=> {
            showLastPay(card?.ls_abon)
          }} variant="contained" color="primary" size="small">
            Смотреть
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan={12} style={{ padding: 0 }}>
          <Divider />
        </td>
      </tr>
      <Modal open={open} handleClose={handleClose}>
        <Grid>
          <Typography variant={"h5"} sx={{
            fontSize: '25px',
            mb: 3,
            textAlign: 'center'
          }}>
            Дата последнего платежа
          </Typography>
          <Grid sx={{
            fontSize: "18px",
            fontFamily: "sans-sarif",
            mb: 1,
            display: 'flex',
            minHeight: '30px',
            border: '2px solid #006993',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <Grid sx={{
              width: '130px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
              background: '#ffffff',
              color: '#006993',
              fontWeight: '600',
            }}>
              Тариф
            </Grid>
            <Grid sx={{
              width: "250px",
              display: 'flex',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#006993',
            }}>
              {lastPayLoading ? <CircularProgress/> : lastPay?.service}
            </Grid>
          </Grid>
          <Grid sx={{
            fontSize: "18px",
            fontFamily: "sans-sarif",
            mb: 1,
            display: 'flex',
            minHeight: '30px',
            border: '2px solid #006993',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <Grid sx={{
              width: '130px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
              background: '#ffffff',
              color: '#006993',
              fontWeight: '600',
            }}>
              Дата
            </Grid>
            <Grid sx={{
              width: "250px",
              display: 'flex',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#006993',
            }}>
              {lastPayLoading ? <CircularProgress/> : dayjs(lastPay?.date).format('DD.MM.YYYY')}
            </Grid>
          </Grid>
          <Grid sx={{
            fontSize: "18px",
            fontFamily: "sans-sarif",
            mb: 1,
            display: 'flex',
            minHeight: '30px',
            border: '2px solid #006993',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <Grid sx={{
              width: '130px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
              background: '#ffffff',
              color: '#006993',
              fontWeight: '600',
            }}>
              Сумма
            </Grid>
            <Grid sx={{
              width: "250px",
              display: 'flex',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#006993',
            }}>
              {lastPayLoading ? <CircularProgress/> : lastPay?.sum + "kgz"}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

export default ListTableItem;