import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import './Communication.scss';

const ChatBox = (props) => {
  const { selected, setEditorVis, setEditing } = props;
  const [message, setMessage] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertType] = useState('danger');
  const [alertMsg] = useState('Error: Something went wrong');

  const simulateNetworkRequest = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const [isSending, setSending] = useState(false);

  useEffect(() => {
    if (isSending) {
      simulateNetworkRequest().then(() => {
        setSending(false);
      });
    }
  }, [isSending]);

  const submit = (evt) => {
    evt.preventDefault();
    setSending(true);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const editGroup = () => {
    setEditorVis(true);
    setEditing(selected);
  };

  if (selected.name === undefined) {
    return (
      <div className="center w-100 h-100">
        <h4>Please select an option from the left</h4>
      </div>
    );
  }

  return (
    <div className="pt-2 px-2">
      <div className="d-flex justify-content-between align-items-center border-bottom">
        <div className="h4">{selected.name}</div>
        <div className="my-1">
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
      </div>
      <div className="toBottom py-2">
        <Form>
          <Form.Group controlId="formGroupDesc">
            <Form.Label>
              Enter Message
              {showAlert
                && (
                <Badge pill variant={alertType} className="mx-2">
                  Failed to send
                </Badge>
                )}
            </Form.Label>
            <Form.Control
              as="textarea"
              id="messageInput"
              rows="2"
              value={message}
              placeholder="Enter message..."
              onChange={(e) => setMessage(e.target.value)}
              isInvalid={showAlert}
            />
          </Form.Group>

          <Button
            variant="primary"
            disabled={isSending}
            onClick={!isSending ? submit : null}
            className="mx-2"
          >
            {isSending ? 'Sending…' : 'Send'}
          </Button>
          {showAlert
            && (
            <Badge pill variant={alertType}>
              Failed to send
            </Badge>
            )}
          <Alert
            variant={alertType}
            show={showAlert}
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {alertMsg}
          </Alert>
        </Form>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  setEditing: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Object).isRequired,
  setEditorVis: PropTypes.func.isRequired,
};
export default ChatBox;
