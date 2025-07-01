import React, {memo, useEffect, useState} from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../../../../Components/Modal/Modal.jsx";
import EmployeeForm from "../../../../Components/EmployeeForm/EmployeeForm.jsx";

const filtersButtonId = 'filtersButton';

const ListHeader = ({ onSearchSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  useEffect(() => {
    onSearchSubmit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='list-header'>
      <form
        className='list-search'
        onSubmit={e => {
          e.preventDefault();
        }}
      >
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
      </form>
    </div>
  );
};

export default memo(ListHeader);
