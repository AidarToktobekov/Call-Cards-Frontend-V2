import React, { memo, useState } from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FiltersPopoverContent from '../FiltersPopoverContent/FiltersPopoverContent.jsx';

const filtersButtonId = 'filtersButton';

const ListHeader = ({
                      cardsLoading,
                      onSearchSubmit,
                      handleFilterChange,
                      filtersState,
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
          filtersButtonId={filtersButtonId}
          anchorEl={anchorEl}
          handleFiltersClose={handleFiltersClose}
          handleFilterChange={handleFilterChange}
          filtersState={filtersState}
        />
        <Button
          id={filtersButtonId}
          className='MuiButton-outlined-white'
          variant='outlined'
          type='submit'
          loadingPosition='start'
          loading={cardsLoading}
          startIcon={<PersonSearchIcon />}
          sx={{
            ml: 'auto'
          }}
        >
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default memo(ListHeader);
