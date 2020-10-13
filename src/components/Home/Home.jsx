import React from 'react';
import { useSelector } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Header from '../Header/Header';
import './Home.scss';

const Home = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
  function selector(store) {
    return {
      name:
        store.teams.length > 0
          ? store.teams[store.status.selected_team].name
          : '',
      role: store.teams.length > 0 ? store.teams[store.status.selected_team].role : '',
    };
  }

  const state = useSelector(selector);
  console.log(state);

  return (
    <>
      <div>
        <Jumbotron className="text-center">
          <h1>
            Welcome to Gametime!
          </h1>
        </Jumbotron>
        <div className="half-screen" />
      </div>

    </>
  );
};

export default Home;
