import React from 'react'
import { Redirect } from 'react-router-dom'

const Private = (props) => {
    // TODO: Prop validation 
    // eslint-disable-next-line react/prop-types
    const { Component } = props;
    const isAuthenticated = true;

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}

export default Private;
