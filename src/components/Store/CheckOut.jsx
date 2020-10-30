import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { purchaseItems } from '../../utils/store/store';

import StoreContext from './context';

import StateOptions from './StateOptions';

const CheckOut = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const { teamId }  = useParams();

  const { cart, updateCart } = useContext(StoreContext);

  const onSubmit = async (data) => {
    setLoading(true);
    // TODO: fetch data
    const res = await purchaseItems(data, cart);
    setLoading(false);
    if(res===true){
      // setAlertMessage('Success!');
      setAlertType('success');
      setShowAlert(true);
      updateCart([]);
    } else {
      // setAlertMessage('Error: Something went wrong');
      setAlertType('danger');
      setShowAlert(true);
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  // const [alertMsg, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  let total = 0;

  const items = cart.map((elm, index) => {
    total += elm.price;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={`cart-item-${index}`} className="py-2">
        <Col>
          {elm.name}
        </Col>
        <Col>
          {elm.type}
        </Col>
        <Col>
          $
          {elm.price}
        </Col>
      </Row>
    )
  });

  // Order was completed
  if(alertType === "success" && showAlert===true){
    return (
      <div className="text-center quarter">
        <Container className="pb-4 mb-4">
          <h2>Success!</h2>
          <h4>Your order has been placed</h4>
          <div className="mt-3">
            <Link to={`/${teamId}/store/`} className="no-link">
              <Button variant="outline-secondary">Return to store</Button>
            </Link>
          </div>

        </Container>
      </div>
    )
  }

  // No items in the cart
  if(cart.length===0){
    return (
      <div className="text-center quarter">
        <Container className="pb-4 mb-4">
          <h2>Your cart is empty</h2>
          <h4>Try adding an item first</h4>
          <div className="mt-3">
            <Link to={`/${teamId}/store/`} className="no-link">
              <Button variant="outline-secondary">Return to store</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (

    <div>
      <Container className="pb-4">
        <div className="text-center">
          <h2 className="border-bottom pb-2 mb-2">Cart</h2>
        </div>  
        {items}
        <h4>
          Total: $
          {' '}
          {total}
        </h4>
      </Container>
      <Container>
        <div className="text-center">
          <h2 className="border-bottom pb-2 mb-2">Contact Info</h2>
        </div> 
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text"
              placeholder="john@gmail.com"
              name="email"
              isValid={formState.touched.email && !errors.email}
              isInvalid={errors.email}
              ref={register({
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                }
                )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St" 
              name="address"
              isValid={formState.touched.address && !errors.address}
              isInvalid={errors.address}
              ref={register({
                    required: "Required",
                }
                )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.address && errors.address.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, studio, or floor" 
              name="address2"
              ref={register()}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text"
                name="city"
                isValid={formState.touched.city && !errors.city}
                isInvalid={errors.city}
                ref={register({
                      required: "Required",
                  }
                  )}
              />
              <Form.Control.Feedback type="valid">
                Looks Good
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.city && errors.city.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..." 
                name="state"
                isValid={formState.touched.state && !errors.state}
                isInvalid={errors.state}
                ref={register({
                    pattern: {
                        value: /^..$/,
                        message: 'Make a selection'
                    }

                })}
              >
                <option>Choose...</option>
                {StateOptions}
              </Form.Control>
              <Form.Control.Feedback type="valid">
                Looks Good
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.state && errors.state.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control 
                type="text"
                name="zip"
                isValid={formState.touched.zip && !errors.zip}
                isInvalid={errors.zip}
                ref={register({
                    required: "Required",
                    pattern: {
                        value: /^\d{5}(?:[-\s]\d{4})?$/,
                        message: 'Enter a valid zip code'
                    }

                })}
              />
              <Form.Control.Feedback type="valid">
                Looks Good
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.zip && errors.zip.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group className="py-2">
            <Button
              id="purchaseItemBtn"
              type="submit"
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleSubmit : null}
            >
              {isLoading ? 'Ordering...' : 'Order'}
            </Button> 

            <Button
              id="resetItemBtn"
              type="button"
              variant="secondary"
              onClick={() => reset()}
              className="mx-3"
            >
              Reset
            </Button>
          </Form.Group>

 

        </Form> 
      </Container>

    </div>
    
  );
}

export default CheckOut;
