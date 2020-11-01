import React from 'react';
import { useSelector } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Home.scss';

const Home = () => {
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
        <h1>Welcome to Gametime!</h1>
      </Jumbotron>
    </div>
  );
};

export default Home;
