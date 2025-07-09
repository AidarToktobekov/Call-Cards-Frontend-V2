import React, {memo, useEffect, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../../../../Components/Modal/Modal.jsx";
import EmployeeForm from "../../../../Components/EmployeeForm/EmployeeForm.jsx";

const filtersButtonId = 'filtersButton';

const ListHeader = ({ onSearchSubmit, searchWord, setSearchWord }) => {
  const handleSearchWordChange = e => setSearchWord(e.target.value);
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  useEffect(() => {
    onSearchSubmit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='list-header'>
      <Grid container spacing={2}>
        <TextField
          className='list-search-field'
          id='outlined-search'
          size='small'
          label='Поиск'
          type='search'
          value={searchWord}
          onChange={handleSearchWordChange}
        />
        <Button
          id={filtersButtonId}
          className='create-employee-button MuiButton-outlined-white'
          variant='outlined'
          type='button'
          loadingPosition='start'
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Новый сотрудник
        </Button>
        <Modal open={openModal} handleClose={closeModal}>
          <EmployeeForm/>
        </Modal>
      </Grid>
    </div>
  );
};

export default memo(ListHeader);
