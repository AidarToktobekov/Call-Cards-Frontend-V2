import React, { memo } from 'react';
import ListTableHeader from '../ListTableHeader/ListTableHeader.jsx';
import ListTableBody from '../ListTableBody/ListTableBody.jsx';
import { Divider, Pagination } from '@mui/material';

const List = ({ cards, currentPage, handlePageChange }) => (
  <div className='list-table-wrapper'>
    <table>
      <ListTableHeader />
      <ListTableBody cards={cards} />
    </table>
    <div style={{}}>
      <Divider style={{ margin: 'auto 0 10px' }} />
      <Pagination
        count={cards?.total_pages || 1}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  </div>
);

export default memo(List);
