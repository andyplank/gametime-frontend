import React from 'react';
import PropTypes, { object } from 'prop-types';

import './Communication.scss';
import ListDisplay from './ListDisplay';

const GroupList = (props) => {
  const {
    groups, selected, setSelected, setEditorVis, setEditing,
  } = props;

  const newGroup = () => {
    setEditorVis(true);
    setEditing({});
  };

  return (
    <div className="pt-2">
      <div className="px-2 d-flex justify-content-between align-items-center">
        <div className="h4">Groups</div>
        <div className="my-1">
          <button
            className="click d-flex text-center align-items-center py-1"
            type="button"
            onClick={newGroup}
          >
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>

      <ListDisplay
        items={groups}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

GroupList.propTypes = {
  setEditorVis: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(object).isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default GroupList;
