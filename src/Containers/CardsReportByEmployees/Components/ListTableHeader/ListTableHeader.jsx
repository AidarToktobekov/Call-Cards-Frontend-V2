import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>СИП</th>
        <th style={{ maxWidth: '240px' }}>Сотрудник</th>
        <th>Кол-во звонков</th>
      </tr>
      <tr>
        <td colSpan={11} style={{ padding: 0 }}>
          <Divider />
        </td>
      </tr>
    </thead>
  );
};

export default memo(ListTableHeader);
