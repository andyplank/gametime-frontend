import React from 'react';
import PropTypes, { object } from 'prop-types';

import './Communication.scss';

const MemberList = (props) => {
  const { members, selected, setSelected } = props;

  const memberList = members.map((member) => (
    <button
      type="button"
      className={selected.id === member.id ? 'px-4 selected' : 'px-4 click'}
      key={member.id}
      onClick={() => setSelected(member)}
    >
      {member.name}
    </button>
  ));

  return (
    <div className="py-2">
      <h4 className="px-2">Members</h4>
      <ul className="list-group">
        {memberList}
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
