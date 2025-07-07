import React, {memo} from 'react';
import ListTableItem from "../ListTableItem/ListTableItem.jsx";

const ListTableBody = ({ cards }) => {

  return (
    <tbody>
      {(cards || []).map(card => <ListTableItem card={card} key={card.id}/>)}
    </tbody>
  )
};

export default memo(ListTableBody);
