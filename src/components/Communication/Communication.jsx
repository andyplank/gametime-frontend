import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import ChatBox from './ChatBox';
import MemberList from './TeamList/MemberList';
import GroupList from './TeamList/GroupList';

import './Communication.scss';
// import networker from '../../utils/networker/networker';

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

  useEffect(() => {
    const fetchMembers = async () => {
      const headers = {
        'Content-Type': 'application/json',
      }
      const data = {
        team: 1
      };
      const config = {
        method: 'post',
        url: 'http://52.91.140.102:8080/team/view/members',
        headers: headers,
        data: data
      }
      try {
        const res = await axios(config);
        if(res.status===200){
          setMembers(res.data);
        }
      } catch (err) {
        setMembers([]);
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
        url: 'http://52.91.140.102:8080/team/view/groups?id=1',
        headers: headers,
        data: data
      }
      try {
        const res = await axios(config);
        if(res.status===200){
          setGroups(res.data.groups);
        }
      } catch (err) {
        setGroups([]);
      }
    }
    fetchGroups();
    fetchMembers();

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
          />
          <MemberList
            members={members}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="col-9">
          <ChatBox members={members} selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Communication;
