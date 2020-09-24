/* eslint-disable no-undef */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const headerStyle = {
  textAlign: 'center',
  paddingBottom: '3%',
};

const users = ['collin', 'Andy', 'Jon', 'Ray', 'Trevor'];

const renderUsers = () => (
  <>
    {users.map((name, index) => {
      const keyNo = index;
      return (
        <>
          <Button className="zoom" key={keyNo}>
            {name}
          </Button>
          <br />
        </>
      );
    })}
  </>
);

const TeamManagement = () => (
  <>
    <div>
      <h1 style={headerStyle}>Team Management</h1>
    </div>
    <Container fluid>
      <Row>
        <Col xs={6} md={4}>
          <h2>Team Controls</h2>
          <ul>
            <li>Create Team</li>
            <li>Edit Team</li>
          </ul>
        </Col>
        <Col xs={12} md={8}>
          <h2>Users</h2>
          {renderUsers()}
        </Col>
      </Row>
    </Container>
  </>
);

export default TeamManagement;
