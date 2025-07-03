import React from 'react';
import {Paper} from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import {useFetchCardsReportBySolutions} from './hooks.js';
import '../../globalStyles/list.css';

const CardsReportBySolution = () => {
  const {
    cardsReportBySolutions,
    cardsReportBySolutionsLoading,
    handleFilterChange,
    onSearchSubmit,
    filtersState,
  } = useFetchCardsReportBySolutions();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          cardsLoading={cardsReportBySolutionsLoading}
          onSearchSubmit={onSearchSubmit}
          handleFilterChange={handleFilterChange}
          filtersState={filtersState}
        />
        <ItemsList
          cards={cardsReportBySolutions}
        />
      </Paper>
    </div>
  );
};

export default CardsReportBySolution;