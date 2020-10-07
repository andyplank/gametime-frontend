import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import './Communication.scss';

const GroupEditor = (props) => {
  const {
    editing, editorVis, setEditorVis, members,
  } = props;

  const simulateNetworkRequest = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const [showAlert, setShowAlert] = useState(false);
  const [alertType] = useState('danger');
  const [alertMsg] = useState('Error: Something went wrong');

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
    setShowAlert(true);
  };

  return (
    <div>
      <Modal show={editorVis} onHide={() => setEditorVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Editor</Modal.Title>
        </Modal.Header>
        <Form>

          <Modal.Body>

            <Form.Group>
              <Form.Label>Group Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter group name..." readOnly value={editing.name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Group Members:</Form.Label>
              {members.map((member) => (
                <Form.Check
                  key={`default-${member.id}`}
                  type="checkbox"
                  label={member.name}
                  defaultChecked={Array.isArray(editing.members)
                    && editing.members.includes(member)}
                />
              ))}
            </Form.Group>

            <Alert
              variant={alertType}
              show={showAlert}
              dismissible
              onClose={() => setShowAlert(false)}
            >
              {alertMsg}
            </Alert>

          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              id="closeGroupEditor"
              variant="secondary"
              onClick={() => setEditorVis(false)}
            >
              Close
            </Button>
            <Button
              id="submitGroupEditor"
              type="submit"
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleClick : null}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>

          </Modal.Footer>
        </Form>

      </Modal>
    </div>
  );
};

GroupEditor.defaultProps = {
  editing: { members: [] },
  members: [],
};
GroupEditor.propTypes = {
  editing: PropTypes.instanceOf(Object),
  editorVis: PropTypes.bool.isRequired,
  setEditorVis: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(object),
};

export default GroupEditor;
