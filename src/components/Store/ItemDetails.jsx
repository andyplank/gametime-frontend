import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';

import StoreContext from './context';

const ItemDetails = () => {

  const { items, addCart } = useContext(StoreContext);
  const { teamId, itemId} = useParams();

  const [item, setItem] = useState({})
  const [type, setType] = useState('')

  const refresh = () => {
    if(!Number.isNaN(itemId)){
      const item_id = parseInt(itemId, 0);
      if(items.length !== 0){
        const temp = items.find((elm) => elm.item_id === item_id);
        setItem(temp);
      }
    }
  }

  useEffect(() => {
    refresh();
  }, [itemId, items])

  useEffect(() => {
    if(item && item.types && Array.isArray(item.types)) {
      setType(item.types[0]);
    } else {
      setType('');
    }
  }, [item]);

  const handleCart = () => {
    const obj = { ...item};
    obj.type = type;
    addCart(obj);
  }

  // Item was not found. Display an error
  if(item===undefined){
    return (
      <Container className="py-4 text-center">
        <h4>That item was not found</h4>
        <div className="text-center py-4">
          <Link to={`/${teamId}/store/`} className="no-link">
            <Button variant="outline-secondary">Return to store</Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Dropdown for the different product types that you can select
  let typeSelector = (<></>);
  if(item && item.types && item.types.length>0){
    typeSelector = (
      <Form.Group controlId="formGridState">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select" 
          onChange={(e) => {setType(e.target.value)}}
        >
          {item && item.types && item.types.map(elm => {
        return (<option key={elm}>{elm}</option>)
      })}
        </Form.Control>
      </Form.Group>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <img src={item.picture} alt={item.name} className="w-100" />
        </Col>
        <Col md={8}>
          <div className="py-4">
            <h2>{item.name}</h2>
            <h3>{item.price}</h3>
            <Form>
              {typeSelector}
              <div className="py-2">
                <Button
                  onClick={() => {handleCart()}}
                >
                  Add to cart
                </Button>
              </div>
              <div>
                <Link to={`/${teamId}/store/checkout`}>
                  <Button>
                    Checkout
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetails;
