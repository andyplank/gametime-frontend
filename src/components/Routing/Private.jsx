import React from 'react'
import { Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
    // TODO: Prop validation 
    // eslint-disable-next-line react/prop-types
    const { Component } = props;
    const isAuthenticated = false;
    
    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}

export default ProtectedRoute;
