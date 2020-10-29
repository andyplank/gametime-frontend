import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Container, Row, Col, Button } from 'react-bootstrap';

import {purchaseItems} from '../../utils/store/store';

import StoreContext from './context';

const Purchase = () => {

  // For user feedback on API responses
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMsg, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { items, addCart } = useContext(StoreContext);

  const [item, setItem] = useState({})
  const [type, setType] = useState('')

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

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

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: fetch data
    const res = await purchaseItems('', '', []);
    setLoading(false);
    if(res===true){
      setAlertMessage('Success!');
      setAlertType('success');
      setShowAlert(true);
    } else {
      setAlertMessage('Error: Something went wrong');
      setAlertType('danger');
      setShowAlert(true);
    }
  };

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
                  <Button>
                    Purchase
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      
      <Container>
        <Form autoComplete="off">

          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter group name..."
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
            isInvalid={email===''}
          />

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St" 
              value={address} 
              onChange={(event) => setAddress(event.target.value)}
              isInvalid={address===''}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, studio, or floor" 
              value={apt} 
              onChange={(event) => setApt(event.target.value)}
              isInvalid={apt===''}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text"
                value={city} 
                onChange={(event) => setCity(event.target.value)}
                isInvalid={apt===''}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control 
                value={zip} 
                onChange={(event) => setZip(event.target.value)}
                isInvalid={apt===''}
              />
            </Form.Group>
          </Form.Row>


          <Alert
            variant={alertType}
            show={showAlert}
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {alertMsg}
          </Alert>


          <Button
            id="purchaseItemBtn"
            type="submit"
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleSubmit : null}
          >
            {isLoading ? 'Ordering...' : 'Order'}
          </Button>

        </Form>
      </Container>
      

    </div>
  );
};

export default Purchase;
