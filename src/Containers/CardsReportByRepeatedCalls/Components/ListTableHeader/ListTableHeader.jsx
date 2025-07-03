import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ minWidth: '140px', textAlign: 'center' }}>ЛС абонента</th>
        <th style={{ minWidth: '140px', textAlign: 'center' }}>Адрес</th>
        <th style={{ textAlign: 'center', minWidth: '260px' }}>
          Номер телефона
        </th>
        <th style={{ minWidth: '150px' }}>Причина</th>
        <th style={{ minWidth: '150px' }}>Решение</th>
        <th>Кол-во</th>
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
