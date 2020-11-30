import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Feedback from './Feedback';

const Confirm = (props) => {
    const {show, setShow, text, refresh, deleteFunc} = props;
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('danger');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      setLoading(true);
      const res = await deleteFunc();
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
          {text}
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

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  deleteFunc: PropTypes.func.isRequired
}
export default Confirm;
