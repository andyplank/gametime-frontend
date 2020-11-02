import React from 'react';
import './Landing.scss';
import {Container, Col, Row} from 'react-bootstrap';
import SearchBar from './SearchBar';
import Football from '../../assets/images/football.jpg';
// import Daniel from '../../assets/images/daniel.jpg';

const Landing = () => {

  return (
    <Container fluid className="fill-vert d-flex justify-content-center">
      <Row className="flex-fill">
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="w-75-md text-center">
            <div>
              <h1>{'It\'s GameTime'}</h1>
            </div>
            <div className="pt-4">
              <SearchBar />
            </div>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-flex no-padding fill-vert">
          <img className="cover" alt="football" src={Football} />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
