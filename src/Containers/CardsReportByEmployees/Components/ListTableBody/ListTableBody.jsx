import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableBody = ({ list }) => (
  <tbody>
    {(list || []).map(item => (
      <React.Fragment key={item.sip}>
        <tr>
          <td>{item.sip}</td>
          <td>{item.spec_full_name}</td>
          <td>{item.count}</td>
        </tr>
        <tr>
          <td colSpan={11} style={{ padding: 0 }}>
            <Divider />
          </td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
);

export default memo(ListTableBody);
