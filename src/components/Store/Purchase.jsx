import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import Col from 'react-bootstrap/Col';

import {purchaseItems} from '../../utils/store/store';

const Purchase = (props) => {
  const { item } = props;

  // For user feedback on API responses
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMsg, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');


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

  return (
    <div>
      {item.name}
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

    </div>
  );
};

Purchase.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Purchase;
