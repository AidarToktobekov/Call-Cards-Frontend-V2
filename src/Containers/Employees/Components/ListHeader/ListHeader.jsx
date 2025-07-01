import React, { memo, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const filtersButtonId = 'filtersButton';

const ListHeader = ({ onSearchSubmit }) => {
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
        >
          Новый сотрудник
        </Button>
      </form>
    </div>
  );
};

export default memo(ListHeader);
