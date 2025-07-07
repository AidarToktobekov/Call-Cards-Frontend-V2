import React, { memo } from 'react';
import { Chip, Divider } from '@mui/material';
import { copyToClipboard } from '../../../../utils.js';

const ListTableBody = ({ cards }) => (
  <tbody>
    {(cards?.result || []).map(card => (
      <React.Fragment key={card.id}>
        <tr>
          <td style={{ textAlign: 'center' }}>{card.id}</td>
          <td style={{ maxWidth: '240px' }}>{card.full_name}</td>
          <td style={{ maxWidth: '240px' }}>{card.address}</td>
          <td style={{ textAlign: 'center' }}>
            {card.call_from ? (
              <Chip
                label={card.call_from}
                onClick={() => copyToClipboard(card.call_from)}
              />
            ) : (
              ''
            )}
          </td>
          <td style={{ textAlign: 'center' }}>{card.ls_abon}</td>
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
          <td style={{ textAlign: 'center' }}>{card.created_at}</td>
          <td>{card.reason_title}</td>
          <td>{card.solution_title}</td>
          <td style={{ textAlign: 'center' }}>{card.sip}</td>
          <td style={{ minWidth: '160px', maxWidth: '240px' }}>
            {card.spec_full_name}
          </td>
          <td style={{ minWidth: '180px', maxWidth: '270px' }}>
            {card.comment}
          </td>
        </tr>
        <tr>
          <td colSpan={12} style={{ padding: 0 }}>
            <Divider />
          </td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
);

export default memo(ListTableBody);
