import React, { useContext, useState } from 'react';

import '../Communication.scss';
import GroupCreator from '../GroupEditor/GroupCreator';
import CommContext from '../context';

const GroupList = () => {
  const {
    groups, selected, setSelected
  } = useContext(CommContext);

  const [editorVis, setEditorVis] = useState(false);

  const handleClick = (item) => {
    setSelected(item);
  }

  const openCreator = () => {
    setEditorVis(true);
  };

  return (
    <div className="pt-2">
      <GroupCreator
        editorVis={editorVis}
        setEditorVis={setEditorVis}
      />
      <div className="px-2 d-flex justify-content-between align-items-center">
        <div className="h4">Groups</div>
        <div className="my-1">
          <button
            className="click d-flex text-center align-items-center py-1"
            type="button"
            onClick={openCreator}
          >
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>

      <ul className="list-group">
        {groups.map((item) => (
          <button
            type="button"
            className={selected.group_id === item.group_id ? 'px-4 selected' : 'px-4 click'}
            key={item.group_id}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </button>
      ))}
      </ul>
    </div>
  );
};

GroupList.propTypes = {};
export default GroupList;
