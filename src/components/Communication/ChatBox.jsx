import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import GroupEditor from './GroupEditor/GroupEditor';

import './Communication.scss';
import CommContext from './context';

import {sendPlayerMessage, sendGroupMessage} from '../../utils/comm/comm';

const ChatBox = () => {
  const { selected } = useContext(CommContext);

  const [message, setMessage] = useState('');
  const [isSending, setSending] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('danger');

  const [editorVis, setEditorVis] = useState(false);

  useEffect(() => {
    setMessage('');
  }, [selected]);
  
  const submit = async (evt) => {
    evt.preventDefault();
    setSending(true);
    let res;
    if(selected.group_id){ 
      // Fix sender id
      res = await sendGroupMessage(selected.group_id, selected.group_id, message);
    } else {
      res = await sendPlayerMessage(selected.user_id, message);
    }
    setSending(false);
    if(res===true){
      setAlertType('success');
      setAlertMessage('Success');
      setShowAlert(true);
      setMessage('');
    } else {
      setAlertType('danger');
      setAlertMessage('Failed to send');
      setShowAlert(true);
    }
    setTimeout(() => setShowAlert(false), 2000);
  };

  const editGroup = () => {
    setEditorVis(true);
  };

  if (selected.constructor !== Object || Object.entries(selected).length === 0) {
    return (
      <div className="center w-100 h-100">
        <h4>Please select an option from the left</h4>
      </div>
    );
  }

  if(selected.name === undefined){
    selected.name = `${selected.first_name} ${selected.last_name}`
  }

  return (
    <div className="pt-2 px-2">
      <div className="d-flex justify-content-between align-items-center border-bottom">
        <div className="h4 mt-2">{selected.name}</div>
        {selected.group_id
        && (
        <div>
          <GroupEditor
            editorVis={editorVis}
            setEditorVis={setEditorVis}
          />
          <button
            className="click d-flex text-center align-items-center py-1"
            type="button"
            onClick={editGroup}
          >
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
          </button>
        </div>
        )}
      </div>
      <div className="toBottom py-2 w-50">
        <Form>
          <Form.Group>
            <Form.Label>
              Enter Message
            </Form.Label>
            <Form.Control
              as="textarea"
              id="messageInput"
              rows="2"
              className="w-100"
              value={message}
              placeholder="Enter message before sending..."
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            disabled={isSending || message===''}
            onClick={!isSending ? submit : null}
            className="mx-2"
          >
            {isSending ? 'Sending…' : 'Send'}
          </Button>
          {showAlert
            && (
            <Badge pill variant={alertType}>
              {alertMessage}
            </Badge>
            )}
        </Form>
      </div>
    </div>
  );
};

ChatBox.propTypes = {};
export default ChatBox;
