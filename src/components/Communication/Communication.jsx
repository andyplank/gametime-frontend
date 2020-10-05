import React, { useState } from 'react';
// import AuthContext from '../../common/context/auth';

import ChatBox from './ChatBox';
import MemberList from './MemberList';
import GroupList from './GroupList';

import './Communication.scss';

const Communication = () => {
  const temp = [{ name: 'Andy', id: '1' }, { name: 'Jim', id: '2' }, { name: 'Daniel', id: '3' }, { name: 'Jon', id: '4' }];
  const temp2 = [{
    name: 'Varsity', id: '10', isGroup: true, members: [temp[0], temp[1]],
  }, {
    name: 'JV', id: '11', isGroup: true, members: [],
  }];
  // const { isAuthenticated } = useContext(AuthContext);
  const [members] = useState(temp);
  const [groups] = useState(temp2);

  // For which group / player is being chatted with
  const [selected, setSelected] = useState({});

  // For the group editor state

  return (
    <div className="container-fluid">
      <div className="row fullScreen">
        <div className="col-3 bg-Primary px-0">
          <GroupList
            members={members}
            groups={groups}
            selected={selected}
            setSelected={setSelected}
          />
          <MemberList
            members={members}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-9">
          <ChatBox
            members={members}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
};

export default Communication;
