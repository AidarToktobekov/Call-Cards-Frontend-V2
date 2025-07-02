import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {useLocation} from 'react-router-dom';
import {Button, CircularProgress, List, ListItem, ListItemButton, Popover, TextField, Typography} from '@mui/material';
import {getPageTitle} from '../../constants.js';
import './contentHeader.css';
import {useFetchClient} from '../../hooks/clientsHook.js';
import Modal from '../Modal/Modal.jsx';
import CreateCard from '../CreateCard/CreateCard.jsx';

const ContentHeader = () => {
  const { pathname } = useLocation();
  const { client, clientLoading, fetchClient } = useFetchClient();
  const [openModal, setOpenModal] = useState({ open: false, client: null });

  const handleCloseModal = () => {
    setOpenModal({ open: false, client: null });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const changeLsAbon = async e => {
    if (e.target.value.length > 8) {
      await fetchClient(e.target.value);
    }
  };

  return (
    <div className='content-header'>
      <Typography variant='h4' component='h4'>
        {getPageTitle(pathname)}
      </Typography>
      <Button
        variant='contained'
        className='create-cards-btn'
        onClick={handleClick}
      >
        <AddIcon />
        Создать карточку
      </Button>

      <Modal open={openModal.open} handleClose={handleCloseModal}>
        <CreateCard client={openModal?.client} />
      </Modal>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <TextField
          variant={'filled'}
          label={'Личный счет | Номер телефона'}
          onChange={changeLsAbon}
          sx={{ width: '300px' }}
        />
        <List>
          <ListItem>
            <ListItemButton
              sx={{
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                justifyContent: 'center',
                background: 'rgba(0,92,255,0.6)',
                borderRadius: '5px',
                '&:hover': { background: 'rgba(0,92,255,0.8)' }
              }}
              onClick={() => setOpenModal({ open: true })}
            >
              Создать карточку
            </ListItemButton>
          </ListItem>
          {clientLoading ? (
            <ListItem sx={{ justifyContent: 'center' }}>
              <CircularProgress />
            </ListItem>
          ) : client.length > 0 ? (
            client.map((item, i) => (
              <ListItem key={i}>
                <ListItemButton
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'Roboto, sans-serif',
                    justifyContent: 'center',
                    background: 'rgba(0,255,247,0.6)',
                    borderRadius: '5px',
                    '&:hover': { background: 'rgba(0,255,247,0.8)' }
                  }}
                  onClick={() => setOpenModal({ open: true, client: item })}
                >
                  {item.full_name}
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ justifyContent: 'center' }}>
              <Typography>Нет данных</Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default ContentHeader;
