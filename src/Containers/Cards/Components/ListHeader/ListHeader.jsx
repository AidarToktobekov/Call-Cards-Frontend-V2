import React, { memo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FiltersPopoverContent from '../FiltersPopoverContent/FiltersPopoverContent.jsx';

const filtersButtonId = 'filtersButton';

const ListHeader = ({
  searchWord,
  filtersState,
  cardsLoading,
  handleSearchWordChange,
  onSearchSubmit,
  handleFilterChange
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFiltersClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleFiltersClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='list-header'>
      <form
        className='list-search'
        onSubmit={e => {
          e.preventDefault();
          onSearchSubmit();
        }}
      >
        <Button className='filters-button' onClick={handleFiltersClick}>
          <FilterListIcon />
          Фильтры
        </Button>
        <FiltersPopoverContent
          open={open}
          filtersState={filtersState}
          filtersButtonId={filtersButtonId}
          anchorEl={anchorEl}
          handleFiltersClose={handleFiltersClose}
          handleFilterChange={handleFilterChange}
        />
        <TextField
          className='list-search-field'
          id='outlined-search'
          size='small'
          label='Поиск по ЛС...'
          type='search'
          value={searchWord}
          onChange={handleSearchWordChange}
        />
        <Button
          id={filtersButtonId}
          variant='outlined'
          type='submit'
          loadingPosition='start'
          loading={cardsLoading}
          startIcon={<PersonSearchIcon />}
        >
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default memo(ListHeader);
