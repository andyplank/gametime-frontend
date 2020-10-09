import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import networker from '../../../utils/networker/networker';

import '../Communication.scss';

const GroupCreator = (props) => {
  const {
    editorVis, setEditorVis, members, refresh
  } = props;

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

  const handleClick = async () => {
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {
      name: groupName,
      team_id: 1,
      member_ids: groupMembers
    };
    const config = {
      method: 'post',
      url: 'http://52.91.140.102:8080/group',
      headers: headers,
      data: data
    }
    try {
      const res = await networker(config);
      if(res.status===200){
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
                  label={member.name}
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

GroupCreator.defaultProps = {
  members: [],
};
GroupCreator.propTypes = {
  refresh: PropTypes.func.isRequired,
  editorVis: PropTypes.bool.isRequired,
  setEditorVis: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(object),
};

export default GroupCreator;
