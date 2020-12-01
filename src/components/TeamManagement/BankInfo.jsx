import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Feedback from '../Common/Feedback';

// TODO: Change api we are hitting
import { contact } from '../../utils/business/business';

const BankInfo = (props) => {
    const {
        team_id, 
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
        const res = await contact(team_id, data.routing, data.account);
        if(res){
        setAlertType('success');
        setShowAlert(true);
        } else {
        setAlertType('danger');
        setShowAlert(true);
        }
        setLoading(false);
    };

    return (
      <div className="py-2">
        <h4>
          Change Bank Information
        </h4>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Form.Group>
            <Form.Label>Routing</Form.Label>
            <Form.Control 
              type="new-password"
              name="name"
              isValid={(formState.touched.routing || formState.isSubmitted) && !errors.routing}
              isInvalid={errors.name}
              ref={register({
                    required: "Required",
            }
            )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.routing && errors.routing.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Account</Form.Label>
            <Form.Control 
              type="new-password"
              name="email"
              isValid={(formState.touched.account || formState.isSubmitted) && !errors.account}
              isInvalid={errors.account}
              ref={register({
                required: "Required",
            }
          )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.account && errors.account.message}
            </Form.Control.Feedback>
          </Form.Group>

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

BankInfo.propTypes = {
    team_id: PropTypes.string.isRequired
}
export default BankInfo;
