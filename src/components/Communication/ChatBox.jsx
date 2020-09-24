import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Communication.scss';

const ChatBox = (props) => {
  const { selected } = props;
  const [message, setMessage] = useState('');

  const submit = (evt) => {
    evt.preventDefault();
  };

  if (selected.name === undefined) {
    return (
      <div className="center w-100 h-100">
        <h4>Please select an option from the left</h4>
      </div>
    );
  }

  return (
    <div className="h-100">
      <div className="pt-2 d-flex justify-content-between align-items-center border-bottom">
        <span className="h4">{selected.name}</span>
        <button
          className="click"
          type="button"
          onClick={() => { }}
        >
          <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          </svg>
        </button>

      </div>
      <div className="toBottom py-2">
        <form onSubmit={submit} className="">
          <div className="form-group">
            Enter your message
            <textarea
              className="form-control"
              id="messageInput"
              rows="2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  selected: PropTypes.instanceOf(Object).isRequired,
};
export default ChatBox;
