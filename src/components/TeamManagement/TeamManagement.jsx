/* eslint-disable */ 
import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import PlayersDisplay from './PlayersDisplay';
import { getPlayers, getTeamData, createTeam, editTeam, getTeamsForUser } from '../../utils/team/team';
import TeamManagementContent from './TeamManagementContent';

const TeamManagement = () => {

  return (
    <div className="fill-vert">
      <TeamManagementContent />
    </div>
  );
};

export default TeamManagement;
