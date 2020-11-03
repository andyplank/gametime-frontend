import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Feedback from './Feedback';
import ItemTypes from './ItemTypes';

import {updateItem, createItem} from '../../utils/store/store';

const ItemForm = (props) => {
  const {show, setShow, item, isNew, 
    teamId, refresh} = props;

  const [allTypes, setAllTypes] = useState([]);
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
    const temp = {...item};
    temp.picture = '';
    reset(temp)
    const types = Array.isArray(item.types) 
      ? item.types 
      : [];
    setAllTypes(types);
  }, [item]);


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
    reader.readAsDataURL(input.files[0]);
  }

  const onSubmit = async (data) => {
    data.price = parseFloat(data.price);
    data.name = data.name.trim();
    setLoading(true);
    let res;
    if (isNew){
      res = await createItem(teamId, data, allTypes, picture);
    } else {
      res = await updateItem(teamId, data, allTypes, picture, item.item_id);
    }
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
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
    
        <Modal.Body>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
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
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control 
                type="number"
                name="price"
                isValid={(formState.touched.price || formState.isSubmitted) && !errors.price}
                isInvalid={errors.price}
                ref={register({
                    required: "Required",
                    min: 0
                  }
                )}
              />
              <Form.Control.Feedback style={{display: 'block'}} type="invalid">
                {errors.price && errors.price.message}
              </Form.Control.Feedback>
              <Form.Control.Feedback style={{display: 'block'}} type="valid">
                {(formState.touched.price || formState.isSubmitted) && !errors.price && ('Looks Good')}
              </Form.Control.Feedback>
            </InputGroup>

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
                  required: isNew ? "Required" : "",
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

          <Form.Group className="text-left">
            <Form.Check
              label="Is active"
              type="checkbox"
              name="active"
              ref={register()}
            />
          </Form.Group>

          <ItemTypes types={allTypes} setTypes={setAllTypes} />

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

ItemForm.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  teamId: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired
}
export default ItemForm;
