import React from 'react';
import { useSelector } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Button, Container} from 'react-bootstrap';
import './Home.scss';
import { Link, useParams} from 'react-router-dom';

const Home = () => {

  const { teamId } = useParams();

  function selector(store) {
    return {
      name:
        store.user.teams.length > 0
          ? store.user.teams[store.status.selected_team].name
          : '',
      role:
        store.user.teams.length > 0
          ? store.user.teams[store.status.selected_team].role
          : '',
    };
  }

  // TODO: Use this
  // eslint-disable-next-line no-unused-vars
  const state = useSelector(selector);

  return (
    <div className="fill-vert">
      <Jumbotron className="text-center">
        <h2>Team Page</h2>
      </Jumbotron>
      <Container>
        <Link to={`/team/${teamId}/store/`} className="no-link">
          <Button>Go to team store</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
