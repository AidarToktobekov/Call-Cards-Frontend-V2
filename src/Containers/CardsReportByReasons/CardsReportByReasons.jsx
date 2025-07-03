import React from 'react';
import {Paper} from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import {useFetchCardsReportByReasons} from './hooks.js';
import '../../globalStyles/list.css';

const CardsReportByReasons = () => {
  const {
    cardsReportByReasons,
    cardsReportByReasonsLoading,
    handleFilterChange,
    onSearchSubmit,
    filtersState,
  } = useFetchCardsReportByReasons();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          cardsLoading={cardsReportByReasonsLoading}
          onSearchSubmit={onSearchSubmit}
          handleFilterChange={handleFilterChange}
          filtersState={filtersState}
        />
        <ItemsList
          cards={cardsReportByReasons}
        />
      </Paper>
    </div>
  );
};

export default CardsReportByReasons;