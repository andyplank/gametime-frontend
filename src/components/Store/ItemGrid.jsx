/* eslint-disable no-unused-vars */
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
  const grids = activeItems.map((item) => {
    const name = item.name.length < 30 ? item.name : `${item.name.substring(0,30).trim()}...`;
    return  (
      <Col xs={6} md={4} lg={3} key={item.item_id}>
        <Link
          to={`/${teamId}/store/item/${item.item_id}`}
        >  
          <div className="square" style={{backgroundImage: `url('${item.picture}')`}} />
        </Link>
      
        <div className="w-100">          
          <div className="pt-1 pb-2">
            <div>
              <h5>{name}</h5>
            </div>
            <div>
              <h6>
                $
                {item.price}
              </h6>
            </div>
          </div>
        </div>
      </Col>
  )});

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
      <Jumbotron className="text-center">
        <h2>Welcome to the team store</h2>
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
