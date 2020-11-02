import React from 'react';
import './Landing.scss';
import {Container, Col, Row} from 'react-bootstrap';
import SearchBar from './SearchBar';

const Landing = () => {

  return (
    <Container fluid className="fill-vert d-flex justify-content-center">
      <Row className="flex-fill">
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="w-75-md text-center">
            <div>
              <h1>Its Gametime</h1>
            </div>
            <div className="pt-4">
              <SearchBar />
            </div>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-flex no-padding fill-vert">
          <img className="h-100" alt="football" src="https://sportshub.cbsistatic.com/i/r/2020/07/22/19e38d68-537b-47c3-b9f8-4cf8870c79e1/thumbnail/640x360/3a6fdb0fa45e52258279391a21b6618b/659221c3-65cc-ea11-80ce-a444a33a3a97-original.jpg" />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
