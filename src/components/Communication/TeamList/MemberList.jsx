/* eslint-disable */
import React, { useContext } from 'react';

import '../Communication.scss';
import CommContext from '../context';

const MemberList = () => {
  const { members, selected, setSelected } = useContext(CommContext);

  const handleClick = (item) => {
    setSelected(item);
  }

  const memberButtons = members.map((member) => (
    <button
      type="button"
      className={selected.user_id === member.user_id ? 'px-4 selected' : 'px-4 click'}
      key={member.user_id}
      onClick={() => handleClick(member)}
    >
      {member.first_name + " " + member.last_name}
    </button>
));

  return (
    <div className="py-2">
      <h4 className="px-2">Members</h4>
      <ul className="list-group">
        {members.map((member) => (
          <button
            type="button"
            className={selected.user_id === member.user_id ? 'px-4 selected' : 'px-4 click'}
            key={member.user_id}
            onClick={() => handleClick(member)}
          >
            {member.first_name + " " + member.last_name}
          </button>
      ))}
      </ul>
    </div>
  );
};

MemberList.propTypes = {};
export default MemberList;
