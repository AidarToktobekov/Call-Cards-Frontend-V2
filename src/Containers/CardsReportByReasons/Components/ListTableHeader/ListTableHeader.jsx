import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableHeader = () => {
  return (
    <thead>
    <tr>
      <th>Причина</th>
      <th>Кол-во</th>
    </tr>
    <tr>
      <td colSpan={2} style={{ padding: 0 }}>
        <Divider />
      </td>
    </tr>
    </thead>
  );
};

export default memo(ListTableHeader);
