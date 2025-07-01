import React, { memo } from 'react';
import { Divider } from '@mui/material';
import ListItem from '../ListItem/ListItem.jsx';

const ListTableBody = ({ list }) => (
  <tbody>
    {(list || []).map((item, i) => (
      <React.Fragment key={`${item.sip}${i}`}>
        <ListItem item={item} />
      </React.Fragment>
    ))}
  </tbody>
);

export default memo(ListTableBody);
