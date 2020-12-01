import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Col } from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import Feedback from '../Common/Feedback';

import { createSession } from '../../utils/fundraising/fundraising';

const Donate = (props) => {
    const {
        team_id,
        player_id
    } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset()
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await createSession(data.ammount, data.email, team_id, player_id);
    if(res===false){
      setAlertType('danger');
      setShowAlert(true);
      setLoading(false);
      return;
    }
    const stripe = await loadStripe('pk_test_51HpQWQH5nNgIxkMEMsc0KLCcjXej4FfNgN8iPf61bsgRYnk0xsFOSwuvBWRaKTgRyY6oK95a7S0fa0HoTUQLwheu00j3NVwfEN');
    const result = await stripe.redirectToCheckout({
      sessionId: res,
    });
    if (result.error) {
      setAlertType('danger');
      setShowAlert(true);
      setLoading(false);
      console.log(result.error.message);
    }
  };

    return (
      <div className="py-2">
        <h4>
          Donate Now!
        </h4>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                  type="number"
                  name="ammount"
                  isValid={(formState.touched.ammount || formState.isSubmitted) && !errors.ammount}
                  isInvalid={errors.ammount}
                  ref={register({
                        required: "Required",
                        min: 1
                    }
                )}
                />
                <Form.Control.Feedback type="valid">
                  Looks Good
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.ammount && errors.ammount.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="new-password"
                  name="email"
                  isValid={(formState.touched.email || formState.isSubmitted) && !errors.email}
                  isInvalid={errors.email}
                  ref={register({
                        required: "Required",
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
            </Col>
          </Form.Row>

          <Feedback 
            alertType={alertType}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
          <Form.Group className="py-2">
            <Button
              id="purchaseItemBtn"
              type="submit"
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleSubmit : null}
            >
              {isLoading ? 'Saving' : 'Save'}
            </Button> 
          </Form.Group>
        </Form> 
      </div>
    )
};

Donate.defaultProps = {
    player_id: "0"
}
Donate.propTypes = {
    team_id: PropTypes.string.isRequired,
    player_id: PropTypes.string
}
export default Donate;
