import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import SearchBar from './SearchBar';

const Landing = () => {

  return (
    <div className="LandingImage">
      <div className="LandingText pb-4">
        <Container>
          <div className="">
            <h1 className="no-select gametime-font landing-text">It&apos;s GameTime</h1>
          </div>
          <div />
          <div className="pt-2 ">
            <SearchBar />
          </div>
          <div className="pt-3">
            Have an account?
            {' '}
            <Link to="/login">Sign in</Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
