import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import ChatBox from './ChatBox';
import MemberList from './TeamList/MemberList';
import GroupList from './TeamList/GroupList';

import './Communication.scss';

import CommContext from './context';

import { fetchMembers, fetchGroups } from '../../utils/comm/comm';

const Communication = () => {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState({});

  const selector = (store) => {
    let role = 'Member';
    if (store.user.teams.length > 0) {
      const perm_level =
        store.user.teams[store.status.selected_team].permission_level;
      if (perm_level === 2) role = 'Owner';
      else if (perm_level === 1) role = 'Administrator';
      else if (perm_level === 0) role = 'Player';
    }
    return {
      name:
        store.user.teams.length > 0
          ? store.user.teams[store.status.selected_team].name
          : '',
      role: role,
      team_id:
        store.user.teams.length > 0
          ? store.user.teams[store.status.selected_team].team_id
          : '',
    };
  };

  const state = useSelector(selector);

  const refresh = () => {
    fetchMembers(setMembers, state.team_id);
    fetchGroups(setGroups, state.team_id);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CommContext.Provider
      value={{
        members,
        setMembers,
        groups,
        setGroups,
        selected,
        setSelected,
        refresh,
      }}
    >
      <Container fluid className="fill-vert">
        <Row className="flex-fill">
          <Col md={3} className="bg-Primary px-0">
            <GroupList team_id={state.team_id} />
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
