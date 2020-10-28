import React, { useState, useEffect } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import {fetchItems} from '../../utils/store/store'


import './Store.scss';

const ItemGrid = () => {
  const [items, setItems] = useState([]);

  const refresh = () => {
    fetchItems(setItems, 1);
  }

  useEffect(() => {
    refresh();
  }, [])

  const grids = items.map((item) => (
    <Col xs={6} md={4} lg={3}>
      <Link to="/"><img alt="Logo" className="w-100 h-100" /></Link>
      <div className="text-center">
        <h6>{item.name}</h6>
      </div>
      <div className="text-right">
        <h5>
          $
          {item.price}
        </h5>
      </div>
    </Col>
  ));
  
  if(items.length === 0){
    return (
      <div className="text-center py-4">
        <h3>Sorry, there are no items in the store yet!</h3>
        <h4>Contact your team administrator for more information</h4>
      </div>
    );
  }

  return (
    <div>
      <Container className="text-center"> 
        <Row>
          {grids}
        </Row>
      </Container>
    </div>
  );
};

export default ItemGrid;
