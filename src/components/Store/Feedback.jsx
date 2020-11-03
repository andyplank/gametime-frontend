import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'react-bootstrap';

const Feedback = (props) => {
  const {alertType, showAlert, setShowAlert} = props;

  if(showAlert===false){
    return (
      <>
      </>
    );
  }

  return (
    <Alert
      variant={alertType}
      show={showAlert}
      dismissible
      onClose={() => setShowAlert(false)}
      className="mt-4"
    >
      {alertType === 'danger' ?
      'Error something went wrong.'
      :
      'Success!'
      }
    </Alert>  
  );
}

Feedback.propTypes = {
  alertType: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  setShowAlert: PropTypes.func.isRequired
}
export default Feedback;
