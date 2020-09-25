import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './Communication.scss';

const GroupEditor = (props) => {
  const { show, setShow } = props;

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will be a form for editing the group</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

GroupEditor.propTypes = {
  show: PropTypes.instanceOf(Boolean).isRequired,
  setShow: PropTypes.func.isRequired,
};

export default GroupEditor;
