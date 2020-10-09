import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import ChatBox from './ChatBox';
import MemberList from './TeamList/MemberList';
import GroupList from './TeamList/GroupList';

import './Communication.scss';
import networker from '../../utils/networker/networker';

const Communication = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);

  // For which group / player is being chatted with
  const [selected, setSelected] = useState({});

  const selector = (store) => {
    return {
      name:
        store.teams.length > 0
          ? store.teams[store.status.selected_team].name
          : '',
      role: store.teams.length > 0 ? store.teams[store.status.selected_team].role : '',
      id: store.teams.length > 0 ? store.teams[store.status.selected_team].id : '',
    };
  }

  const state = useSelector(selector);
  console.log(state);

  const fetchMembers = async () => {
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {
      team: 1
    };
    const config = {
      method: 'post',
      url: 'https://52.91.140.102:8080/team/view/members',
      headers: headers,
      data: data
    }
    try {
      const res = await networker(config);
      if(res.status===200){
        setMembers(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const fetchGroups = async () => {
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {
      team: 1
    };
    const config = {
      method: 'get',
      url: 'https://52.91.140.102:8080/team/view/groups?id=1',
      headers: headers,
      data: data
    }
    try {
      const res = await networker(config);
      if(res.status===200){
        setGroups(res.data.groups);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const refresh = () =>{
    fetchGroups();
    fetchMembers();
  }

  useEffect(() => {
    refresh();
  }, [])

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
            refresh={refresh}
          />
          <MemberList
            members={members}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-9">
          <ChatBox members={members} selected={selected} refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Communication;
