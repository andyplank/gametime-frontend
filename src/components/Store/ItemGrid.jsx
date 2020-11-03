import React, { useContext } from 'react';

import { Jumbotron , Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import StoreContext from './context';

import './Store.scss';

const notFoundIMG = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blocclt.com%2Fpage&psig=AOvVaw016I79VDRI4QnNkzRhxcs5&ust=1604441404663000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCCzJLw5OwCFQAAAAAdAAAAABAD";

const ItemGrid = () => {
  const { teamId } = useParams();
  const { items } = useContext(StoreContext);
  
  const activeItems = items.filter((item) => item.active);
  const grids = activeItems.map((item) => (
    <Col xs={6} md={4} lg={3} key={item.item_id} className="d-flex align-items-end">
      <div>
        <div className="w-100">
          <Link to={`/${teamId}/store/item/${item.item_id}`}>
            <img
              alt={item.name}
              className="w-100"
              src={item.picture} 
              onError={(e)=>{e.target.onerror = null; e.target.src=notFoundIMG}}
            />
          </Link>
        </div>
        <div className="text-center">
          <h6>{item.name}</h6>
        </div>
        <div className="text-right">
          <h5>
            $
            {item.price}
          </h5>
        </div>
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
    <div className="fill-vert">
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to the team store</h1>
        </Container>
      </Jumbotron>
      <Container className="py-4">
        <Row className="flex-fill">
          {grids}
        </Row>
      </Container>
    </div>
  );
};

export default ItemGrid;
