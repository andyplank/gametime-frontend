/* eslint-disable react/prop-types */
import React from 'react';

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

export default Feedback;