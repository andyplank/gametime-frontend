/* eslint-disable */ 
import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import TeamManagementContent from './TeamManagementContent';

const TeamManagement = () => {
  function selector(store) {
    return {
      selected: store.status.selected_team,
    };
  }

  const storeState = useSelector(selector);
  return (
    <>
      <Header />
      <TeamManagementContent teamId={storeState.selected}/>
    </>
  );
};

export default TeamManagement;
