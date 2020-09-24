import React from 'react';
import PropTypes, { any, array } from 'prop-types';

import './Communication.scss';

const GroupList = (props) => {
  const { groups, selected, setSelected } = props;

  const addGroup = (evt) => {
    evt.preventDefault();
  };

  const groupsList = groups.map((group) => (
    <button
      type="button"
      className={selected.id === group.id ? 'px-4 selected' : 'px-4 click'}
      key={group.id}
      onClick={() => setSelected(group)}
    >
      {group.name}
    </button>
  ));

  return (
    <div className="pt-2">
      <div className="px-2 d-flex justify-content-between align-items-center">
        <span className="h4">Groups</span>
        <button
          className="click"
          type="button"
          onClick={addGroup}
        >
          <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>

      <ul className="list-group">
        {groupsList}
      </ul>
    </div>
  );
};

GroupList.propTypes = {
  groups: PropTypes.instanceOf(array).isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setSelected: PropTypes.instanceOf(any).isRequired,
};
export default GroupList;
