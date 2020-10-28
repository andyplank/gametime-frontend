import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

const Private = (props) => {
    const { Component } = props;
    const isAuthenticated = true;

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}


Private.propTypes = {
  Component: PropTypes.elementType.isRequired
}
export default Private;
