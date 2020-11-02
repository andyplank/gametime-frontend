/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from 'react-bootstrap';
import Feedback from '../Feedback';
import UploadPicture from '../UploadPicture/UploadPicture';
import ItemTypes from './ItemTypes';

const ItemForm = (props) => {
  const {show, setShow, item} = props;

  const [allTypes, setAllTypes] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  async function onSavePicture(picture){
    // eslint-disable-next-line no-unused-vars
    const formattedPicture = `data:image/jpeg;base64,${picture}`
  }

  useEffect(() => {
    reset(item)
  }, [item]);


  const closeModal = () => {
    setShowAlert(false);
    setShow(false);
  }

  const onSubmit = async (data) => {
    setLoading(true);
    // TODO: fetch data
    setLoading(false);
    if(data){
      setAlertType('success');
      setShowAlert(true);
    } else {
      setAlertType('danger');
      setShowAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={() => closeModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
    
        <Modal.Body>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control 
              type="text"
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
              type="number"
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
 
          <ItemTypes types={allTypes} setTypes={setAllTypes} />

          <Form.Group>
            <Form.Label>Picture</Form.Label>
            <Form.Control 
              type="file"
              name="picture"
              isValid={formState.isDirty.picture && !errors.picture}
              isInvalid={errors.picture}
              ref={register({
                    required: "Required",
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

          {/* <UploadPicture savePicture={onSavePicture} /> */}
          <Feedback 
            alertType={alertType}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
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
              onClick={() => { reset(); setShowAlert(false) }}
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