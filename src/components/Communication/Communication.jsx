import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import {Container, Row, Col} from 'react-bootstrap';

import ChatBox from './ChatBox';
import MemberList from './TeamList/MemberList';
import GroupList from './TeamList/GroupList';


import './Communication.scss';

import CommContext from './context';

import {fetchMembers, fetchGroups} from '../../utils/comm/comm'

const Communication = () => {

  // TODO: Remove temp vars
  const temp = [{ first_name: 'Andy', user_id: '1' }, { first_name: 'Jim', user_id: '2' }, { first_name: 'Daniel', user_id: '3' }, { first_name: 'Jon', user_id: '4' }];
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

  // TODO: Use state
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
      <Container fluid className="fill-vert">
        <Row className="flex-fill">
          <Col md={3} className="bg-Primary px-0">
            <GroupList />
            <MemberList />
          </Col>
          <Col md={9}>
            <ChatBox />
          </Col>
        </Row>
      </Container>
    </CommContext.Provider>
  );
};

export default Communication;
