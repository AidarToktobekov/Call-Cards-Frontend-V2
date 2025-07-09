import React from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import '../../globalStyles/list.css';
import {useFetchFilterData} from "../../globalHooks.js";

const CardsReportByEmployees = () => {
  const { users, usersLoading, fetchUsers} = useFetchFilterData();

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          listLoading={usersLoading}
          onSearchSubmit={fetchUsers}
        />
        <ItemsList list={users} />
      </Paper>
    </div>
  );
};

export default CardsReportByEmployees;
