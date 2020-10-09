import React from 'react';
import PropTypes, { object } from 'prop-types';

import '../Communication.scss';

const ListDisplay = (props) => {
  const { items, selected, setSelected } = props;

  const temp = (item) => {
    setSelected(item)
  }

  return (
    <ul className="list-group">
      {items.map((item) => (
        <button
          type="button"
          className={selected.user_id === item.user_id ? 'px-4 selected' : 'px-4 click'}
          key={item.user_id}
          onClick={temp(item)}
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
