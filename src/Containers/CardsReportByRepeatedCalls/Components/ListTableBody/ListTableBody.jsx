import React, { memo } from 'react';
import {Chip, Divider, Grid} from '@mui/material';
import { copyToClipboard } from '../../../../utils.js';

const ListTableBody = ({ cards }) => (
  <tbody>
    {(cards?.result || []).map((card, i) => (
      <React.Fragment key={i}>
        <tr>
          <td style={{ textAlign: 'center' }}>{card.ls_abon}</td>
          <td>{card.address}</td>
          <td style={{ maxWidth: '320px', textAlign: 'center' }}>
            <Grid sx={{
              display: 'flex',
              gap: '4px',
            }}>
              {card.sip.map((sip, i) => (
                <Chip
                  key={`${sip}${i}`}
                  label={sip}
                />
              ))}
            </Grid>
          </td>
          <td style={{ maxWidth: '320px', textAlign: 'center' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px'
              }}
            >
              {card.phone_number.map((phoneNumber, i) => (
                <Chip
                  key={`${phoneNumber}${i}`}
                  label={phoneNumber}
                  onClick={() => copyToClipboard(phoneNumber)}
                />
              ))}
            </div>
          </td>
          <td>{card.reason.title}</td>
          <td>{card.solution.title}</td>
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
