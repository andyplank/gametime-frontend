import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../utils/auth/auth';
import { getUser } from '../../utils/user/user';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mutex, setMutex] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  // If user is logged in, redirect to landing
  const state = useSelector((store) => {
    return { signed_in: store.status.signed_in };
  });
  if (state.signed_in) {
    history.push('/');
  }

  async function handleSubmit() {
    // Do not allow multiple outstanding requests
    if (mutex) {
      return;
    }
    // Clear any pre-existing error messages, and mark as loading
    setMutex(true);
    setErrorMsg('');

    // Query login API
    const { message, error, success, user_id } = await authenticate(
      email,
      password
    );

    if (!error && success) {
      const user = await getUser(user_id);
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_TEAMS', payload: user.teams });
      dispatch({ type: 'SET_SIGNED_IN', payload: true });
      // history.push('/home');
      history.push('/');
    } else {
      setErrorMsg(message);
      setMutex(false);
    }
  }

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
            <Form noValidate>
              <Form.Group className="py-2" controlId="formBasicEmail">
                <Form.Label className="login-form-label">
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={errorMsg !== ''}
                  size="lg"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="formBasicPassword">
                <Form.Label className="login-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={errorMsg !== ''}
                  size="lg"
                  placeholder="Password"
                />
              </Form.Group>
              <div className="d-flex flex-column align-items-center">
                {errorMsg !== '' && (
                  <span className="invalid-feedback d-block text-center pb-4">
                    {errorMsg}
                  </span>
                )}
                <div className="py-2">
                  <Button
                    className="px-3 py-2"
                    size="lg"
                    variant="primary"
                    type="Sign In"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
