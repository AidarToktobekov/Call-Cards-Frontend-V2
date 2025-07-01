import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Логин</th>
        <th style={{ maxWidth: '240px' }}>Сотрудник</th>
        <th>СИП</th>
        <th style={{ textAlign: 'center', width: '110px' }}>Действия</th>
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
