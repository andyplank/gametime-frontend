import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import {updateMembers} from '../../../utils/comm/comm';

import CommContext from '../context';

import '../Communication.scss';

const GroupEditor = (props) => {
  const {
    editorVis, setEditorVis
  } = props;

  const { selected, members, refresh } = useContext(CommContext)

  // For user feedback on API responses
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMsg, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  
  const [initMembers, setInitMembers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  
  useEffect(() => {
    const temp = [];
    if(selected.users !== undefined && Array.isArray(selected.users)){
      selected.users.forEach(member => {
        temp.push(member.user_id);
      });
    }
    setInitMembers(temp);
    setGroupMembers(initMembers);
  }, [editorVis, selected])

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

  const handleSubmit = async () => {
    setLoading(true);
    const res = await updateMembers(selected, initMembers, groupMembers);
    setLoading(false);
    if(res===true){
      setAlertMessage('Success!');
      setAlertType('success');
      setShowAlert(true);
      refresh();
    } else {
      setAlertMessage('Error: Something went wrong');
      setAlertType('danger');
      setShowAlert(true);
    }
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
              <Form.Control type="text" readOnly value={selected.name} />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              {members.map((member) => (
                <Form.Check
                  key={`editor-${member.user_id}`}
                  type="checkbox"
                  id={member.user_id}
                  label={`${member.first_name  } ${  member.last_name}`}
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
              onClick={!isLoading ? handleSubmit : null}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>

          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

GroupEditor.propTypes = {
  editorVis: PropTypes.bool.isRequired,
  setEditorVis: PropTypes.func.isRequired,
};

export default GroupEditor;
