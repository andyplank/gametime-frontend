import React from 'react';
import PropTypes, { object } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Communication.scss';

const GroupEditor = (props) => {
  const { show, setShow, members } = props;

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Editor</Modal.Title>
        </Modal.Header>
        <Form>

          <Modal.Body>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="Enter group name..." />
            </Form.Group>

            <Form.Group controlId="formGroupDesc">
              <Form.Label>Group Description</Form.Label>
              <Form.Control type="text" placeholder="Enter group description..." />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              {members.map((member) => (
                <Form.Check
                  key={`default-${member.id}`}
                  type="checkbox"
                  id={member.id}
                  label={member.name}
                />
              ))}
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </div>
  );
};

GroupEditor.defaultProps = {
  members: [],
};
GroupEditor.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(object),
};

export default GroupEditor;
