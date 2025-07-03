import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import { useFetchCards } from './hooks.js';
import '../../globalStyles/list.css';

const CardsReportByRepeatedCalls = () => {
  const {
    repeatedCalls,
    filtersState,
    currentPage,
    searchWord,
    repeatedCallsLoading,
    handleSearchWordChange,
    onSearchSubmit,
    handlePageChange,
    handleFilterChange
  } = useFetchCards();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          filtersState={filtersState}
          searchWord={searchWord}
          cardsLoading={repeatedCallsLoading}
          handleSearchWordChange={handleSearchWordChange}
          onSearchSubmit={onSearchSubmit}
          handleFilterChange={handleFilterChange}
        />
        <ItemsList
          cards={repeatedCalls}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Paper>
    </div>
  );
};

export default CardsReportByRepeatedCalls;
