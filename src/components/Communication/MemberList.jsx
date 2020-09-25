import React from 'react';
import PropTypes, { object } from 'prop-types';
import ListDisplay from './ListDisplay';

import './Communication.scss';

const MemberList = (props) => {
  const { members, selected, setSelected } = props;

  return (
    <div className="py-2">
      <h4 className="px-2">Members</h4>
      <ListDisplay
        items={members}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(object).isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default MemberList;
