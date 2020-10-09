import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import '../Communication.scss';

import networker from '../../../utils/networker/networker';

const GroupEditor = (props) => {
  const {
    editing, editorVis, setEditorVis, members,
  } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMsg, setAlertMessage] = useState('');

  const [groupMembers, setGroupMembers] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const initMembers = [];
  editing.members.forEach(element => {
    initMembers.push(element[0]);
  });

  useEffect(() => {
    setGroupMembers(initMembers);
  }, [editorVis, editing])

  const handleCheck = (event) => {
    const temp = groupMembers;
    if(event.target.checked){
      temp.push(parseInt(event.target.id, 10));
      setGroupMembers(temp);
    } else {
      const index = temp.indexOf(parseInt(event.target.id, 10));
      if (index > -1) {
        temp.splice(index, 1);
        setGroupMembers(temp);
      }
    }
  }

  const addMembers = async () => {
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {
      group_id: editing.group_id,
      new_members: groupMembers.filter(elm => !initMembers.includes(elm))
    };
    const config = {
      method: 'put',
      url: 'http://52.91.140.102:8080/group/addMembers',
      headers: headers,
      data: data
    }
    return networker(config);
  }

  const removeMembers = () => {
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {
      group_id: editing.group_id,
      remove_members: initMembers.filter(elm => !groupMembers.includes(elm))
    };
    const config = {
      method: 'delete',
      url: 'http://52.91.140.102:8080/group/deleteMembers',
      headers: headers,
      data: data
    }
    return networker(config);
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      const u1 = await addMembers();
      const u2 = await removeMembers();
      if(u1.status===200 && u2.status===200){
        setAlertMessage('Success!');
        setAlertType('success');
        setShowAlert(true);
      }
    } catch (err) {
      setAlertMessage('Error: Something went wrong');
      setAlertType('danger');
      setShowAlert(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal show={editorVis} onHide={() => setEditorVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Editor</Modal.Title>
        </Modal.Header>
        <Form autoComplete="off">
          <Modal.Body>

            <Form.Group>
              <Form.Label>Group Name:</Form.Label>
              <Form.Control type="text" readOnly value={editing.name} />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              {members.map((member) => (
                <Form.Check
                  key={`editor-${member.user_id}`}
                  type="checkbox"
                  id={member.user_id}
                  label={member.name}
                  defaultChecked={initMembers.includes(member.user_id)}
                  onChange={handleCheck}
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
