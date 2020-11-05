/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';

import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';

const Logout = () => {

  cookie.remove('access_token');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_DEFAULT' });
  });
  
  return (
    <div>
      <Redirect to="/" />
    </div>
  )
}

export default Logout;
