import React, { memo } from 'react';
import ListTableHeader from '../ListTableHeader/ListTableHeader.jsx';
import ListTableBody from '../ListTableBody/ListTableBody.jsx';

const ItemsList = ({ list }) => (
  <div className='list-table-wrapper'>
    <table>
      <ListTableHeader />
      <ListTableBody list={list} />
    </table>
  </div>
);

export default memo(ItemsList);
