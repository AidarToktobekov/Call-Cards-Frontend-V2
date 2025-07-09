import React, {useEffect, useState} from 'react';
import { Paper } from '@mui/material';
import ListHeader from './Components/ListHeader/ListHeader.jsx';
import ItemsList from './Components/ItemsList/ItemsList.jsx';
import '../../globalStyles/list.css';
import {useFetchFilterData} from "../../globalHooks.js";

const CardsReportByEmployees = () => {
  const { users, usersLoading, fetchUsers} = useFetchFilterData();
  const [ searchWord, setSearchWord ] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (searchWord) {
      setFilteredList(users.filter(user => user?.full_name.toLowerCase().includes(searchWord.toLowerCase())));
    }else {
      setFilteredList(users);
    }
  }, [users, searchWord]);

  return (
    <div className='list'>
      <Paper className='list-paper'>
        <ListHeader
          listLoading={usersLoading}
          onSearchSubmit={fetchUsers}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
        <ItemsList list={filteredList} />
      </Paper>
    </div>
  );
};

export default CardsReportByEmployees;
