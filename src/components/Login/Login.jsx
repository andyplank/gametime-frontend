import React, { useContext } from 'react';
import './Login.scss';
import AuthContext from '../../common/context/auth';

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  return (

    <div>
      <h1>Login</h1>
      <span>{isAuthenticated ? 'I am logged in' : 'I am not logged in'}</span>
      <div>
        <button type="button" onClick={login}>
          {isAuthenticated ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default Login;
