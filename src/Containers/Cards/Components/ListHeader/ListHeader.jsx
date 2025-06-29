import React from 'react';
import { Divider } from '@mui/material';

const ListTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ minWidth: '30px', textAlign: 'center' }}>ID</th>
        <th>ФИО</th>
        <th style={{ minWidth: '140px', textAlign: 'center' }}>ЛС абонента</th>
        <th style={{ textAlign: 'center', minWidth: '260px' }}>
          Номер телефона
        </th>
        <th style={{ minWidth: '190px', textAlign: 'center' }}>
          Дата создания
        </th>
        <th>Причина</th>
        <th>Решение</th>
        <th>СИП</th>
        <th>Старший смены</th>
        <th>Комментарий</th>
      </tr>
      <tr>
        <td colSpan={10} style={{ padding: 0 }}>
          <Divider />
        </td>
      </tr>
    </thead>
  );
};

export default ListTableHeader;
