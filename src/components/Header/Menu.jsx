import React from 'react';
import { Row, Card, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  MdAccountCircle,
  MdHome,
  MdMessage,
  MdFolder,
  MdStore,
  MdPowerSettingsNew,
  MdAssignmentTurnedIn,
  MdAttachMoney,
  MdCheck
} from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Menu.scss';

const Menu = (props) => {
  const history = useHistory();

  const { first_name, last_name, role, team_id } = props;
  const name = `${first_name} ${last_name}`;
  const accountIconSize = 60;
  const linkIconSize = 24;

  return (
    <div className="menu">
      <Card style={{ width: '300px' }}>
        <ListGroup>
          {/* Account */}
          <ListGroup.Item onClick={() => history.push('/account')}>
            <Row>
              <MdAccountCircle size={accountIconSize} />
              <div className="menu-account-text">
                <span className="menu-account-heading">{name}</span>
                <span className="menu-account-subheading">
                  {role && role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </div>
            </Row>
          </ListGroup.Item>
          {/* Links */}
          {role !== 'Member' && (
            <ListGroup.Item
              onClick={() => history.push(`/team/${team_id}/home`)}
            >
              <Row className="align-items-center">
                <MdHome size={linkIconSize} className="mx-sm-2" />
                Homepage
              </Row>
            </ListGroup.Item>
          )}
          {role === 'Owner' && (
            <ListGroup.Item onClick={() => history.push('/manage/team')}>
              <Row className="align-items-center">
                <MdAssignmentTurnedIn size={linkIconSize} className="mx-sm-2" />
                Management
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item onClick={() => history.push('/message')}>
              <Row className="align-items-center">
                <MdMessage size={linkIconSize} className="mx-sm-2" />
                Messaging
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item onClick={() => history.push('/manage/store')}>
              <Row className="align-items-center">
                <MdStore size={linkIconSize} className="mx-sm-2" />
                Store
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item
              onClick={() => history.push('/manage/documentation')}
            >
              <Row className="align-items-center">
                <MdFolder size={linkIconSize} className="mx-sm-2" />
                Documentation
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item onClick={() => history.push('/manage/business')}>
              <Row className="align-items-center">
                <FaHandsHelping size={linkIconSize} className="mx-sm-2" />
                Sponsors
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item onClick={() => history.push('/manage/fundraiser')}>
              <Row className="align-items-center">
                <MdAttachMoney size={linkIconSize} className="mx-sm-2" />
                Fundraising
              </Row>
            </ListGroup.Item>
          )}
          {role !== 'Member' && (
            <ListGroup.Item onClick={() => history.push(`/team/${team_id}/photos/approve`)}>
              <Row className="align-items-center">
                <MdCheck size={linkIconSize} className="mx-sm-2" />
                Approve Photos
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item onClick={() => history.push('/logout')}>
            <Row className="align-items-center">
              <MdPowerSettingsNew size={linkIconSize} className="mx-sm-2" />
              Sign Out
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

Menu.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team_id: PropTypes.string.isRequired,
};

export default Menu;
