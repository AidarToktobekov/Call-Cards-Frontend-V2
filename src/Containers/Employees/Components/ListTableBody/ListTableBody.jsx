import React, { memo } from 'react';
import { Divider } from '@mui/material';

const ListTableBody = ({ list }) => (
  <tbody>
    {(list || []).map((item, i) => (
      <React.Fragment key={`${item.sip}${i}`}>
        <tr>
          <td>{item.sip}</td>
          <td>{item.full_name}</td>
          <td>{item.sip}</td>
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
