import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import './cards.css';
import { useFetchCards } from './hooks.js';

const Cards = () => {
  const {
    cards,
    currentPage,
    searchWord,
    cardsLoading,
    handleSearchWordChange,
    onSearchSubmit,
    handlePageChange
  } = useFetchCards();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          searchWord={searchWord}
          cardsLoading={cardsLoading}
          handleSearchWordChange={handleSearchWordChange}
          onSearchSubmit={onSearchSubmit}
          handlePageChange={handlePageChange}
        />
        <ItemsList
          cards={cards}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Paper>
    </div>
  );
};

export default Cards;
