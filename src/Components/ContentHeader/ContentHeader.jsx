import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { PAGE_NAMES } from '../../constants.js';
import './contentHeader.css';

const ContentHeader = () => {
  const { pathname } = useLocation();

  return (
    <div className='content-header'>
      <Typography variant='h4' component='h4'>
        {PAGE_NAMES[pathname]}
      </Typography>
      <Button variant='contained'>
        <AddIcon />
        Создать карточку
      </Button>
    </div>
  );
};

export default ContentHeader;
