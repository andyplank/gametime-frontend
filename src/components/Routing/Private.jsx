import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import {  useSelector } from 'react-redux';

const Private = (props) => {
    const { Component } = props;
    const isAuthenticated = useSelector((store) => {
      if(store.status.signed_in){
        return true;
      }
      return false;
    });

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
