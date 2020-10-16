import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import ChatBox from './ChatBox';
import MemberList from './TeamList/MemberList';
import GroupList from './TeamList/GroupList';

import './Communication.scss';

import CommContext from './context';

import {fetchMembers, fetchGroups} from '../../utils/comm/comm'

const Communication = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
  const temp = [{ name: 'Andy', user_id: '1' }, { name: 'Jim', user_id: '2' }, { name: 'Daniel', user_id: '3' }, { name: 'Jon', user_id: '4' }];
  const temp2 = [{ name: 'Varsity', group_id: '10', members:[temp[0], temp[1]] }, { name: 'JV', group_id: '11', members: [] }];
  const [members, setMembers] = useState(temp);
  const [groups, setGroups] = useState(temp2);
  const [selected, setSelected] = useState({});

  const selector = (store) => {
    return {
      name:
        store.teams.length > 0
          ? store.teams[store.status.selected_team].name
          : '',
      role: store.teams.length > 0 ? store.teams[store.status.selected_team].role : '',
      team_id: store.teams.length > 0 ? store.teams[store.status.selected_team].id : '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  const state = useSelector(selector);

  const refresh = () => {
    fetchMembers(setMembers);
    fetchGroups(setGroups);
  }

  useEffect(() => {
    refresh();
  }, [])

  return (
    <CommContext.Provider
      value={{
      members,
      setMembers,
      groups,
      setGroups,
      selected,
      setSelected,
      refresh
    }}
    >
      <div className="container-fluid">
        <div className="row fullScreen">
          <div className="col-3 bg-Primary px-0">
            <GroupList />
            <MemberList />
          </div>
          <div className="col-9">
            <ChatBox />
          </div>
        </div>
      </div>
    </CommContext.Provider>
  );
};

export default Communication;
