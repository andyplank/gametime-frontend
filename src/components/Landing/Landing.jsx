/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './Landing.scss';
import SearchBar from './SearchBar';

const Landing = () => {

  return (
    <div className="LandingImage fill-vert">
      <div className="LandingText">
        <div className="">
          <h1 className="gametime-font landing-text">It's GameTime</h1>
        </div>

        <div />
        <div className="pt-4 ">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Landing;
