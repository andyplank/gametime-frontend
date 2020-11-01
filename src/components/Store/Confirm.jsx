/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteItem } from '../../utils/store/store'

const Confirm = (props) => {

    const {show, setShow, item, team_id} = props;

    const handleClose = async () => {
        const res = await deleteItem(team_id, item.item_id);
        if (res===true)
        setShow(false);
    }

    return (
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {item.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
    );
}

export default Confirm;