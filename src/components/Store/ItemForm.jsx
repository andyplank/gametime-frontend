/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Form, Modal } from 'react-bootstrap';
import UploadPicture from '../UploadPicture/UploadPicture';


const ItemForm = (props) => {
  const {show, setShow} = props;

  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  async function onSavePicture(picture){
    const formattedPicture = `data:image/jpeg;base64,${picture}`
    console.log(formattedPicture);
  }

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
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  }

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
    
        <Modal.Body>
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
          <UploadPicture savePicture={onSavePicture} />

        </Modal.Body>
        <Modal.Footer>
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

        </Modal.Footer>
      </Form> 

    </Modal>

    )
};

export default ItemForm;