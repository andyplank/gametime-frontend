import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';

import StoreContext from './context';

const ItemDetails = () => {

  const { items, addCart } = useContext(StoreContext);
  const { teamId } = useParams();

  const [item, setItem] = useState({})
  const [type, setType] = useState('')

  const refresh = () => {
    if(items.length !== 0){
      setItem(items.find((elm) => elm.item_id === 1));
    }
  }

  useEffect(() => {
    setType(item.types && Array.isArray(item.types) ? item.types[0] : '');
  }, [item]);

  useEffect(() => {
    refresh();
  }, [items])

  const handleCart = () => {
    const obj = { ...item};
    obj.type = type;
    addCart(obj);
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <img src={item.picture} alt={item.name} />
          </Col>
          <Col md={8}>
            <div className="py-4">
              <h2>{item.name}</h2>
              <h3>{item.price}</h3>
              <Form>
                <Form.Group controlId="formGridState">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select" 
                    onChange={(e) => {setType(e.target.value)}}
                  >
                    {item.types && item.types.map(elm => {
                    return (<option key={elm}>{elm}</option>)
                  })}
                  </Form.Control>
                </Form.Group>
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
                      Purchase
                    </Button>
                  </Link>

                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};

export default ItemDetails;
