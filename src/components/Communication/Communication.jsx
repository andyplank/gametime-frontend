import React, { useState } from 'react';
// import AuthContext from '../../common/context/auth';

import ChatBox from './ChatBox';
import MemberList from './MemberList';
import GroupList from './GroupList';

import './Communication.scss';
import GroupEditor from './GroupEditor';

const Communication = () => {
  const temp = [{ name: 'Andy', id: '1' }, { name: 'Jim', id: '2' }, { name: 'Daniel', id: '3' }, { name: 'Jon', id: '4' }];
  const temp2 = [{ name: 'Varsity', id: '10' }, { name: 'JV', id: '11' }];
  // const { isAuthenticated } = useContext(AuthContext);
  const [members] = useState(temp);
  const [groups] = useState(temp2);

  // For which group / player is being chatted with
  const [selected, setSelected] = useState({});

  // For the group editor state
  const [editorVis, setEditorVis] = useState(false);
  const [editing, setEditing] = useState({});

  return (
    <div className="container-fluid">
      <GroupEditor
        members={members}
        editing={editing}
        editorVis={editorVis}
        setEditorVis={setEditorVis}
      />
      <div className="row">
        <div className="col-3 bg-Primary px-0">
          <GroupList
            groups={groups}
            selected={selected}
            setSelected={setSelected}
            setEditing={setEditing}
            setEditorVis={setEditorVis}
          />
          <MemberList
            members={members}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-9">
          <ChatBox
            selected={selected}
            setEditorVis={setEditorVis}
            setEditing={setEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Communication;
