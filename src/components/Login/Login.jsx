import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import LoginForm from './LoginForm';

const Login = () => {

  return (
    <div className="login-background">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <span className="login-title">GameTime</span>
        <span className="login-subtitle pb-2">
          Don&apos;t have an account? Create one&nbsp;
          <Link to="/register">
            <i>here</i>
          </Link>
        </span>
        <div className="login-card">
          <div className="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
