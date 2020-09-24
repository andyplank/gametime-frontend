import React, { useState } from 'react';
import './Communication.scss';
// import AuthContext from '../../common/context/auth';
import ChatBox from './ChatBox';
import MemberList from './MemberList';
import GroupList from './GroupList';


const Communication = () => {
  const temp = [{ name: 'Andy', id: '1' }, { name: 'Jim', id: '2' }, { name: 'Daniel', id: '3' }, { name: 'Jon', id: '4' }];
  const temp2 = [{ name: 'Varsity', id: '10' }, { name: 'JV', id: '11' }];
  // const { isAuthenticated } = useContext(AuthContext);
  const [members] = useState(temp);
  const [groups, setGroups] = useState(temp2);
  const [selected, setSelected] = useState({});


  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 bg-Primary px-0">
            <GroupList
              groups={groups}
              setGroups={setGroups}
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
            <ChatBox selected={selected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
