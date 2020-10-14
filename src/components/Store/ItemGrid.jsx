import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Store.scss';

const ItemGrid = () => {

    return (
      <div>
        <Container className="text-center"> 
          <Row>
            <Col xs={6} md={4} lg={3}>
              Hello
            </Col>
            <Col xs={6} md={4} lg={3}>
              Hello
            </Col>
            <Col xs={6} md={4} lg={3}>
              Hello
            </Col>
            <Col xs={6} md={4} lg={3}>
              Hello
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default ItemGrid;
