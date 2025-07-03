import React, {memo} from 'react';
import {Divider} from '@mui/material';

const ListTableBody = ({ cards }) => (
  <tbody>
  {(cards || []).map((card , i)=> (
    <React.Fragment key={i}>
      <tr>
        <td>{card.reason}</td>
        <td>{card.count}</td>
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
