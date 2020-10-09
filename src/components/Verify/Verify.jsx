import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { verify } from '../../utils/registration/registration';
import './Verify.scss';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [mutex, setMutex] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  async function handleSubmit() {
    // Do not allow multiple outstanding requests
    if (mutex) {
      return;
    }
    // Clear any pre-existing error messages, and mark as loading
    setErrorMsg('');
    setMutex(true);

    // Query verify API
    const data = {
      email: email,
      password: password,
      code: code
    };

    const { message, error, success } = await verify(data);

    if (!error && success) {
      history.push('/home');
    } else {
      setErrorMsg(message);
      setMutex(false);
    }
  }

  return (
    <div className="verify-background">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <span className="verify-title">Verify your Account</span>
        <div className="verify-card">
          <div className="verify-form">
            <Form noValidate>
              <Form.Group className="py-2" controlId="formBasicEmail">
                <Form.Label className="verify-form-label">
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
                <Form.Label className="verify-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={errorMsg !== ''}
                  size="lg"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="py-2" controlId="formBasicCode">
                <Form.Label className="verify-form-label">
                  Verification Code
                </Form.Label>
                <Form.Control
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  isInvalid={errorMsg !== ''}
                  size="lg"
                  placeholder="Code"
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
                    Verify
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

export default Verify;
