import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import { useFetchCardsByEmployees } from './hooks.js';
import '../../globalStyles/list.css';

const CardsReportByEmployees = () => {
  const { employees, employeesLoading, onSearchSubmit } =
    useFetchCardsByEmployees();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          listLoading={employeesLoading}
          onSearchSubmit={onSearchSubmit}
        />
        <ItemsList list={employees} />
      </Paper>
    </div>
  );
};

export default CardsReportByEmployees;
