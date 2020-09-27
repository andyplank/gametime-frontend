import React from 'react';
import PropTypes, { object } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Communication.scss';

const GroupEditor = (props) => {
  const {
    editing, editorVis, setEditorVis, members,
  } = props;

  return (
    <div>
      <Modal show={editorVis} onHide={() => setEditorVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Editor</Modal.Title>
        </Modal.Header>
        <Form>

          <Modal.Body>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="Enter group name..." value={editing.name} />
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
            <Button variant="secondary" onClick={() => setEditorVis(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setEditorVis(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </div>
  );
};

GroupEditor.defaultProps = {
  editing: { name: 'New' },
  members: [],
};
GroupEditor.propTypes = {
  editing: PropTypes.instanceOf(Object),
  editorVis: PropTypes.bool.isRequired,
  setEditorVis: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(object),
};

export default GroupEditor;
