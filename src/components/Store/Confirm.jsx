/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteItem } from '../../utils/store/store'
import Feedback from './Feedback';

const Confirm = (props) => {
    const {show, setShow, item, team_id, refresh} = props;
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('danger');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      setLoading(true);
      const res = await deleteItem(team_id, item.item_id);
      setShowAlert(true);
      if (res===true) {
        refresh();
        setAlertType('success');
      } else {
        setLoading(false);
        setAlertType('danger');
      }
    }

    return (
      
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {' '}
          {item.name}
          <Feedback 
            alertType={alertType}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button 
            disabled={loading}
            variant="danger"
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
    );
}

export default Confirm;
