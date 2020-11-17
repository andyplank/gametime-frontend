import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Feedback from '../Common/Feedback';

import { createSponsor } from '../../utils/business/business';

const Sponsorship = (props) => {
  const {
    show, 
    setShow, 
    team_id, 
    refresh
  } = props;

  const [picture, setPicture] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  useEffect(() =>{
    if(picture.length > 5242880) {
      setError("picture", {
        type: "manual",
        message: "File size too big"
      });
    }
  }, [picture])

  const { register, handleSubmit, errors, formState, reset, setError } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setPicture('');
    reset();
  }, [show]);


  const closeModal = () => {
    setShowAlert(false);
    setShow(false);
  }

  const handlePicture = (e) => {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setPicture(dataURL);
    };
    try {
        reader.readAsDataURL(input.files[0]);
    } catch (err) {
        setPicture('');
    }
  }

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await createSponsor(team_id, data.name, picture);
    if(res){
      setAlertType('success');
      setShowAlert(true);
      refresh();
    } else {
      setAlertType('danger');
      setShowAlert(true);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={() => closeModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Sponsorship Details</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
    
        <Modal.Body>
          <Form.Group>
            <Form.Label>Sponsorship Name</Form.Label>
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

          <Form.Group>
            <Form.Label>Picture</Form.Label>
            <Form.Control 
              type="file"
              name="picture"
              accept="image/jpeg"
              className="btn no-padding"
              onChange={(e) => handlePicture(e)}
              isValid={picture!=='' && !errors.picture}
              isInvalid={picture==='' && errors.picture}
              ref={register({
                  required: "Required",
                  pattern: {
                    value: /^.*\.(jpg|JPG|jpeg|JPEG)$/,
                    message: "Must be a JPG file"
                  }
                }
              )}
            />
            <Form.Control.Feedback type="valid">
              Looks Good
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.picture && errors.picture.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Feedback 
            alertType={alertType}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </Modal.Body>
        <Modal.Footer>
          <Form.Group className="py-2">
            <Button
              id="resetItemBtn"
              type="button"
              variant="secondary"
              onClick={() => { setShow(false) }}
              className="mx-3"
            >
              Close
            </Button>
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

        </Modal.Footer>
      </Form> 

    </Modal>

    )
};

Sponsorship.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  team_id: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired
}
export default Sponsorship;
