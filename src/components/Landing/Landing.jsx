/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Landing = () => {

  return (
    <div className="LandingImage">
      <div className="LandingText pb-4">
        <div className="">
          <h1 className="gametime-font landing-text">It's GameTime</h1>
        </div>

        <div />
        <div className="pt-4 ">
          <SearchBar />
        </div>
        <div className="pt-3">
          Have an account?
          {' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
