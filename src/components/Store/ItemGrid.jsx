import React, { useContext } from 'react';

import { Jumbotron , Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import StoreContext from './context';



import './Store.scss';

const ItemGrid = () => {
  
  const { teamId } = useParams();

  const { items } = useContext(StoreContext);
  
  const grids = items.map((item) => (
    <Col xs={6} md={4} lg={3} key={item.item_id}>
      <Link to={`/${teamId}/store/item/${item.item_id}`}><img alt="Logo" className="w-100 h-100" src={item.picture} /></Link>
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
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to the team store</h1>
        </Container>
      </Jumbotron>
      <Container className="text-center"> 
        <Row>
          {grids}
        </Row>
      </Container>
    </div>
  );
};

export default ItemGrid;
