import React, { Suspense, useEffect, useState } from 'react';
import { Autocomplete, Button, Paper, Popover, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFetchCards, useFetchFilterData } from './hooks.js';
import dayjs from 'dayjs';
import ListTableBody from './Components/ListBody/ListTableBody.jsx';
import ListTableHeader from './Components/ListHeader/ListHeader.jsx';
import './cards.css';

const filtersButtonId = 'filtersButton';

const Cards = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    reasons,
    solutions,
    users,
    reasonsLoading,
    solutionsLoading,
    employeesLoading,
    fetchFilterData
  } = useFetchFilterData();
  const { cards, cardsLoading, fetchCards } = useFetchCards();
  const [searchWord, setSearchWord] = useState('');
  const [filtersState, setFiltersState] = useState({
    start_date: dayjs().startOf('month'),
    end_date: dayjs().endOf('month')
  });

  useEffect(() => {
    void fetchFilterData();
  }, [fetchFilterData]);

  const handleFilterChange = (name, value) =>
    setFiltersState(prevState => ({ ...prevState, [name]: value }));

  const handleSearchWordChange = e => {
    setSearchWord(e.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearchSubmit = async e => {
    e.preventDefault();
    void fetchCards({ ...filtersState, searchWord });
  };

  const ListHeader = () => (
    <div className='list-header'>
      <form className='list-search' onSubmit={onSearchSubmit}>
        <Button className='filters-button' onClick={handleClick}>
          <FilterListIcon />
          Фильтры
        </Button>
        {PopoverContent()}
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

  const PopoverContent = () => (
    <Popover
      id={filtersButtonId}
      className='list-search-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <div className='list-search-popover-r-s'>
        <Autocomplete
          multiple
          id='tags-standard'
          options={reasons}
          loading={reasonsLoading}
          getOptionLabel={option => option.title}
          getOptionKey={option => option.id}
          renderInput={params => (
            <TextField
              {...params}
              variant='standard'
              label='Причины'
              placeholder='Причины'
            />
          )}
          value={filtersState?.reasons || []}
          onChange={(e, value) => handleFilterChange('reasons', value)}
        />
        <Autocomplete
          multiple
          options={solutions}
          loading={solutionsLoading}
          getOptionLabel={option => option.title}
          getOptionKey={option => option.id}
          renderInput={params => (
            <TextField
              {...params}
              variant='standard'
              label='Решения'
              placeholder='Решения'
            />
          )}
          value={filtersState?.solutions || []}
          onChange={(e, value) => handleFilterChange('solutions', value)}
        />
      </div>
      <div className='list-search-popover-employees'>
        <Autocomplete
          multiple
          options={users}
          loading={employeesLoading}
          getOptionLabel={option => `${option.full_name} (${option.sip})`}
          getOptionKey={option => option.id}
          renderInput={params => (
            <TextField
              {...params}
              variant='standard'
              label='Сотрудники'
              placeholder='Сотрудники'
            />
          )}
          value={filtersState?.users || []}
          onChange={(e, value) => handleFilterChange('users', value)}
        />
      </div>
      <div className='list-search-popover-date-picker'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label='Начало'
              format='DD.MM.YYYY'
              value={filtersState.start_date}
              onChange={value => handleFilterChange('start_date', value)}
            />
            {' - '}
            <DatePicker
              label='Конец'
              format='DD.MM.YYYY'
              value={filtersState.end_date}
              onChange={value => handleFilterChange('end_date', value)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Popover>
  );

  const List = () => (
    <Suspense>
      <div className='list-table-wrapper'>
        <table>
          {<ListTableHeader />}
          {<ListTableBody cards={cards?.result} />}
        </table>
      </div>
    </Suspense>
  );

  return (
    <div className='list'>
      <Paper className='list-paper'>
        {ListHeader()}
        {List()}
      </Paper>
    </div>
  );
};

export default Cards;
