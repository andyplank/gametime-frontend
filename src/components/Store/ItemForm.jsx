import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Container, Button, Form } from 'react-bootstrap';

const ItemForm = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // TODO: fetch data
    setLoading(false);
    if(data){
      // setAlertMessage('Success!');
      setAlertType('success');
      setShowAlert(true);
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

  // Order was completed
  if(alertType === "success" && showAlert===true){
    return (
      <div className="text-center quarter">
        <Container className="pb-4 mb-4">
          <h2>Success!</h2>
        </Container>
      </div>
    )
  }

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="T-Shirt"
            name="name"
            isValid={formState.touched.name && !errors.name}
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

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="text"
            placeholder="1.00"
            name="price"
            isValid={formState.touched.price && !errors.price}
            isInvalid={errors.price}
            ref={register({
                    required: "Required",
                }
              )}
          />
          <Form.Control.Feedback type="valid">
            Looks Good
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.price && errors.price.message}
          </Form.Control.Feedback>
        </Form.Group>

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
    )
};

export default ItemForm;