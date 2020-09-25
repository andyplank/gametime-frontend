import React from 'react';
import PropTypes, { object } from 'prop-types';

import './Communication.scss';

const ListDisplay = (props) => {
  const {
    items, selected, setSelected,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <button
          type="button"
          className={selected.id === item.id ? 'px-4 selected' : 'px-4 click'}
          key={item.id}
          onClick={() => setSelected(item)}
        >
          {item.name}
        </button>
      ))}
    </ul>
  );
};

ListDisplay.propTypes = {
  items: PropTypes.arrayOf(object).isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default ListDisplay;
