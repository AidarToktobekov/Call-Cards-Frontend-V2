import React, { memo, useEffect } from 'react';
import { Autocomplete, Popover, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useFetchFilterData} from "../../../../globalHooks.js";

const PopoverContent = ({
  open,
  filtersState,
  filtersButtonId,
  anchorEl,
  handleFiltersClose,
  handleFilterChange
}) => {
  const {
    reasons,
    solutions,
    users,
    reasonsLoading,
    solutionsLoading,
    usersLoading,
    fetchFilterData
  } = useFetchFilterData();

  useEffect(() => {
    void fetchFilterData();
  }, [fetchFilterData]);

  return (
    <Popover
      id={filtersButtonId}
      className='list-search-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleFiltersClose}
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
          loading={usersLoading}
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
};

export default memo(PopoverContent);
