import React, { memo } from 'react';
import ListTableHeader from '../ListTableHeader/ListTableHeader.jsx';
import ListTableBody from '../ListTableBody/ListTableBody.jsx';

const ItemsList = ({ cards }) => (
  <div className='list-table-wrapper'>
    <table>
      <ListTableHeader />
      <ListTableBody cards={cards} />
    </table>
  </div>
);

export default memo(ItemsList);
