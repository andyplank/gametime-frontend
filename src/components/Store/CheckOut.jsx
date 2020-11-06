import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { purchaseItems } from '../../utils/store/store';

import StoreContext from './context';
import Feedback from "./Feedback";

const CheckOut = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const { team_id }  = useParams();

  const { cart, updateCart } = useContext(StoreContext);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await purchaseItems(data, cart, team_id);
    if(res===true){
      setAlertType('success');
      setShowAlert(true);
      updateCart([]);
    } else {
      setAlertType('danger');
      setShowAlert(true);
    }
    setLoading(false);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  let total = 0;

  const items = cart.map((elm) => {
    total += elm.quantity*elm.price;
    return (
      <Row key={`cart-item-${elm.item_id}-${elm.type}`} className="pt-2">
        <Col>
          {elm.name}
        </Col>
        <Col>
          {elm.type}
        </Col>
        <Col>
          {elm.quantity}
        </Col>
        <Col>
          {elm.price.toFixed(2)}
        </Col>
        <Col>
          $
          {(elm.quantity*elm.price).toFixed(2)}
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
          <div className="my-3">
            <Link to={`/team/${team_id}/store/`} className="no-link">
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
      <div className="text-center quarter" id="empty-cart">
        <Container className="pb-4 mb-4">
          <h2>Your cart is empty</h2>
          <h4>Try adding an item first</h4>
          <div className="mt-3">
            <Link to={`/team/${team_id}/store/`} className="no-link">
              <Button variant="outline-secondary">Return to store</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (

    <div className="py-4">
      <Container className="pb-4">
        <div className="text-center">
          <h2 className="border-bottom pb-2 mb-2">Cart</h2>
        </div>  
        <Row className="pt-2 h6">
          <Col>
            Name
          </Col>
          <Col>
            Type
          </Col>
          <Col>
            Quantity
          </Col>
          <Col>
            Price per
          </Col>
          <Col>
            Total Price
          </Col>
        </Row>
        {items}
        <div className="pt-2"> 
          <h4>
            Total: $
            {total.toFixed(2)}
          </h4>
        </div>
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

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text"
                placeholder="San Diego"
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
                type="text"
                placeholder="CA"
                name="state"
                isValid={formState.touched.state && !errors.state}
                isInvalid={errors.state}
                ref={register({
                 required: "Required",
                  pattern: {
                      value: /^..$/,
                      message: 'Enter 2 Digit state code: (New York -> NY)'
                  }
                })}
              />
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
                placeholder="92101"
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

            <Link to={`/team/${team_id}/store/`} className="no-link">
              <Button variant="outline-secondary">Return to store</Button>
            </Link>
          </Form.Group>
        </Form> 

        <Feedback 
          alertType={alertType}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />

      </Container>

    </div>
    
  );
}

export default CheckOut;
