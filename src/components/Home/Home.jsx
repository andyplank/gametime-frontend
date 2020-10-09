import React from 'react';
import './Home.scss';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Header from '../Header/Header';

const Content = () => {
  return (
    <div>
      <Jumbotron className="text-center">
        <h1>San Marcos Lacrosse</h1>
      </Jumbotron>
      <div className="half-screen" />
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default Home;
