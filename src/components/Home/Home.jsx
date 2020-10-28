import React from 'react';
import { useSelector } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Home.scss';


const Home = () => {

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
    <div className="">
      <Jumbotron className="text-center">
        <h1>
          Welcome to Gametime!
        </h1>
      </Jumbotron>
    </div>
  );
};

export default Home;
