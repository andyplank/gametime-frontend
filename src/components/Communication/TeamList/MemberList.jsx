/* eslint-disable */
import React from 'react';
import PropTypes, { object } from 'prop-types';

import '../Communication.scss';

const MemberList = (props) => {
  const { members, selected, setSelected } = props;

  const handleClick = (item) => {
    setSelected(item);
  }

  const memberButtons = members.map((item) => (
    <button
      type="button"
      className={selected.user_id === item.user_id ? 'px-4 selected' : 'px-4 click'}
      key={item.user_id}
      onClick={() => handleClick(item)}
    >
      {item.name}
    </button>
  ));

  return (
    <div className="py-2">
      <h4 className="px-2">Members</h4>
      <ul className="list-group">
        {members.length !== 0 ? groupButtons : (
            <li className="px-4 py-2">
              <h6>There are no members, try inviting people!</h6>
            </li>
        )}
      </ul>
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(object).isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default MemberList;
