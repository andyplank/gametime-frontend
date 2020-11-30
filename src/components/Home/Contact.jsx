import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Col } from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import Feedback from '../Common/Feedback';

import { contact } from '../../utils/business/business';

const Contact = () => {

  const { team_id } = useParams();
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
    const res = await contact(team_id, data.name, data.email, data.description);
    if(res){
      setAlertType('success');
      setShowAlert(true);
      reset()
    } else {
      setAlertType('danger');
      setShowAlert(true);
    }
    setLoading(false);
  };

    return (
      <div className="py-2">
        <h4>
          Contact the team!
        </h4>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="new-password"
                  name="name"
                  isValid={(formState.touched.name || formState.isSubmitted) && !errors.name}
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
                  {errors.name && errors.name.message}
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

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text-field"
              name="description"
              isValid={(formState.touched.description || formState.isSubmitted) && !errors.description}
              isInvalid={errors.description}
              ref={register({
                    required: "Required",
                }
              )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.description && errors.description.message}
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

Contact.propTypes = {}
export default Contact;
