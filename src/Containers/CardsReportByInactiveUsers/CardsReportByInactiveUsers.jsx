import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import { useFetchCards } from './hooks.js';
import '../../globalStyles/list.css';

const CardsReportByInactiveUsers = () => {
  const {
    inactivesCards,
    filtersState,
    currentPage,
    searchWord,
    inactivesCardsLoading,
    handleSearchWordChange,
    onSearchSubmit,
    handlePageChange,
    handleFilterChange,
    exportCards,
    exportLoading
  } = useFetchCards();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          filtersState={filtersState}
          searchWord={searchWord}
          cardsLoading={inactivesCardsLoading}
          handleSearchWordChange={handleSearchWordChange}
          onSearchSubmit={onSearchSubmit}
          handleFilterChange={handleFilterChange}
          exportCards={exportCards}
          exportCardsLoading={exportLoading}
        />
        <ItemsList
          cards={inactivesCards}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Paper>
    </div>
  );
};

export default CardsReportByInactiveUsers;
