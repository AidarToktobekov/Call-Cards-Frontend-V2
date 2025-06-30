import React, { memo } from 'react';

const ListTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>СИП</th>
        <th style={{ maxWidth: '240px' }}>Сотрудник</th>
        <th>Кол-во звонков</th>
      </tr>
    </thead>
  );
};

export default memo(ListTableHeader);
