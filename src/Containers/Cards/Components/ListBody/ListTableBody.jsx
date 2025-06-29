import React from 'react';
import { Chip, Divider, Pagination } from '@mui/material';
import { copyToClipboard } from '../../../../utils.js';

const ListTableBody = ({
  cards = [],
  currentaPage,
  pagesCount,
  handlePageChange
}) => {
  return (
    <tbody>
      {cards.map(card => (
        <React.Fragment key={card.id}>
          <tr key={card.id}>
            <td style={{ textAlign: 'center' }}>{card.id}</td>
            <td style={{ maxWidth: '240px' }}>{card.full_name}</td>
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
            <td>{card.sip}</td>
            <td>{card.spec_full_name}</td>
            <td>{card.comment}</td>
          </tr>
          <tr>
            <td colSpan={10} style={{ padding: 0 }}>
              <Divider />
            </td>
          </tr>
        </React.Fragment>
      ))}
      <tr className='list-pagination'>
        <td colSpan={10} style={{ paddingTop: 0 }}>
          <Divider style={{ marginBottom: '10px' }} />
          <Pagination
            count={pagesCount}
            page={currentaPage}
            onChange={handlePageChange}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ListTableBody;
