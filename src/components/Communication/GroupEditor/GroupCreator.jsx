import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import {createGroup} from '../../../utils/comm/comm';

import '../Communication.scss';
import CommContext from '../context';

const GroupCreator = (props) => {
  const {
    editorVis, setEditorVis, team_id
  } = props;

  const { members, refresh } = useContext(CommContext)

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMsg, setAlertMessage] = useState('');

  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setGroupName('');
    setGroupMembers([]);
  }, [editorVis])

  const handleCheck = (event) => {
    const temp = groupMembers;
    if(event.target.checked){
      temp.push(event.target.id);
      setGroupMembers(temp);
    } else {
      const index = temp.indexOf(event.target.id);
      if (index > -1) {
        temp.splice(index, 1);
        setGroupMembers(temp);
      }
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    const res = await createGroup(groupName, groupMembers, team_id);
    setLoading(false);
    if(res===true){
      setAlertMessage('Success!');
      setAlertType('success');
      setShowAlert(true);
    } else {
      setAlertMessage('Error: Something went wrong');
      setAlertType('danger');
      setShowAlert(true);
    }
    refresh();
  };

  return (
    <div>
      <Modal show={editorVis} onHide={() => setEditorVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Group Creator</Modal.Title>
        </Modal.Header>
        <Form autoComplete="off">
          <Modal.Body>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter group name..."
                value={groupName} 
                onChange={(event) => setGroupName(event.target.value)}
                isInvalid={groupName===''}
              />
            </Form.Group>

            <Form.Group>
              {members.map((member) => (
                <Form.Check
                  key={`creator-${member.user_id}`}
                  type="checkbox"
                  id={member.user_id}
                  label={`${member.first_name  } ${  member.last_name}`}
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
              disabled={groupName==='' || isLoading}
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

GroupCreator.propTypes = {
  editorVis: PropTypes.bool.isRequired,
  setEditorVis: PropTypes.func.isRequired,
  team_id: PropTypes.string.isRequired
};

export default GroupCreator;
