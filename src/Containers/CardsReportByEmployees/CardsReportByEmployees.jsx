import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import { useFetchCardsByEmployees } from './hooks.js';
import './cardsReportByEmployees.css';

const CardsReportByEmployees = () => {
  const {
    filtersState,
    cardsByEmployees,
    cardsByEmployeesLoading,
    onSearchSubmit,
    handleFilterChange
  } = useFetchCardsByEmployees();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          filtersState={filtersState}
          listLoading={cardsByEmployeesLoading}
          onSearchSubmit={onSearchSubmit}
          handleFilterChange={handleFilterChange}
        />
        <ItemsList
          list={cardsByEmployees}
        />
      </Paper>
    </div>
  );
};

export default CardsReportByEmployees;
