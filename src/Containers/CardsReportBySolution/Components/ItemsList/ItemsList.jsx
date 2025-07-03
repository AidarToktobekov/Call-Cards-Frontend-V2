import React, { memo } from 'react';
import ListTableHeader from '../ListTableHeader/ListTableHeader.jsx';
import ListTableBody from '../ListTableBody/ListTableBody.jsx';
import { Divider } from '@mui/material';

const ItemsList = ({ cards }) => (
  <div className='list-table-wrapper'>
    <table>
      <ListTableHeader />
      <ListTableBody cards={cards} />
    </table>
    <div className='list-pagination-wrapper'>
      <Divider style={{ marginBottom: '10px' }} />
    </div>
  </div>
);

export default memo(ItemsList);
