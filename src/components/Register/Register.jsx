import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { register } from '../../utils/registration/registration';
import './Register.scss';

const Register = () => {
  const [state, setState] = useState({
    first_name: {
      value: '',
      errorMsg: '',
    },
    last_name: {
      value: '',
      errorMsg: '',
    },
    email_address: {
      value: '',
      errorMsg: '',
    },
    password: {
      value: '',
      errorMsgs: [],
    },
    confirm_password: {
      value: '',
      errorMsg: '',
    },
    phone_number: {
      value: '',
      errorMsg: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [globalErrorMsg, setGlobalErrorMsg] = useState('');
  const history = useHistory();

  function validate() {
    // Clone pre-existing state to prevent inputted data loss
    const newState = _.cloneDeep(state);

    // Store validity state as inputs are checked
    let valid = true;

    // Validate first name
    if (state.first_name.value === '') {
      newState.first_name.errorMsg = 'First name is a required field';
      valid = false;
    } else if (state.first_name.value.length > 50) {
      newState.first_name.errorMsg = 'First name must be 50 characters or less';
      valid = false;
    }

    // Validate last name
    if (state.last_name.value === '') {
      newState.last_name.errorMsg = 'Last name is a required field';
      valid = false;
    } else if (state.last_name.value.length > 50) {
      newState.last_name.errorMsg = 'Last name must be 50 characters or less';
      valid = false;
    }

    // Validate email address
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.email_address.value === '') {
      newState.email_address.errorMsg = 'Email address is a required field';
      valid = false;
    } else if (!email_regex.test(state.email_address.value)) {
      newState.email_address.errorMsg = 'Email address is not valid';
      valid = false;
    }

    // Validate phone number
    const phone_number_regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (state.phone_number.value === '') {
      newState.phone_number.errorMsg = 'Phone number is a required field';
      valid = false;
    } else if (!phone_number_regex.test(state.phone_number.value)) {
      newState.phone_number.errorMsg = 'Phone number is not valid';
      valid = false;
    }

    // Validate password
    const errors = [];
    if (state.password.value === '') {
      errors.push('Password is a required field');
      valid = false;
    } else {
      if (state.password.value.length < 12) {
        errors.push('Password must be at least 12 characters in length');
        valid = false;
      }
      if (state.password.value.length > 50) {
        errors.push('Password must be at 50 characters or less in length');
        valid = false;
      }
      if (!RegExp('.*[A-Z].*').test(state.password.value)) {
        errors.push('Password must contain at least one capital letter');
        valid = false;
      }
      if (!RegExp('.*[a-z].*').test(state.password.value)) {
        errors.push('Password must contain at least one lowercase letter');
        valid = false;
      }
      if (!RegExp('.*[0-9].*').test(state.password.value)) {
        errors.push('Password must contain at least one number');
        valid = false;
      }
      if (state.password.value.includes(' ')) {
        errors.push('Password must not contain any spaces');
        valid = false;
      }
    }
    newState.password.errorMsgs = errors;

    // Validate confirm password
    if (state.confirm_password.value !== state.password.value) {
      newState.confirm_password.errorMsg = 'Passwords do not match';
      valid = false;
    }

    // Update state if one or more fields were invalid
    if (!valid) {
      setState(newState);
    }
    return valid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    const data = {
      first_name: state.first_name.value,
      last_name: state.last_name.value,
      email_address: state.email_address.value,
      phone_number: `+1${state.phone_number.value.replace(/[^0-9]/g, '')}`,
      password: state.password.value,
    };

    const { message, error, success } = await register(data);
    if (success && !error) {
      history.push('/verify');
      return;
    }

    setGlobalErrorMsg(message);
    setLoading(false);
  }

  return (
    <div className="register-background">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <span className="register-title">Register an Account</span>
        <div className="register-card">
          <div className="register-form">
            <Form noValidate>
              {/* First Name */}
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formFirstName">
                    <Form.Control
                      isInvalid={state.first_name.errorMsg !== ''}
                      value={state.first_name.value}
                      onChange={(e) =>
                        setState({
                          ...state,
                          first_name: {
                            value: e.target.value,
                            errorMsg: '',
                          },
                        })
                      }
                      size="lg"
                      placeholder="First Name"
                    />
                    {state.first_name.errorMsg !== '' && (
                      <Form.Text className="invalid-feedback d-block">
                        {state.first_name.errorMsg}
                      </Form.Text>
                    )}
                  </Form.Group>
                </div>
                {/* Last Name */}
                <div className="col-md-6">
                  <Form.Group controlId="formLastName">
                    <Form.Control
                      isInvalid={state.last_name.errorMsg !== ''}
                      value={state.last_name.value}
                      onChange={(e) =>
                        setState({
                          ...state,
                          last_name: {
                            value: e.target.value,
                            errorMsg: '',
                          },
                        })
                      }
                      size="lg"
                      placeholder="Last Name"
                    />
                    {state.last_name.errorMsg !== '' && (
                      <Form.Text className="invalid-feedback d-block">
                        {state.last_name.errorMsg}
                      </Form.Text>
                    )}
                  </Form.Group>
                </div>
              </div>
              {/* Email */}
              <Form.Group controlId="formEmailAddress">
                <Form.Control
                  isInvalid={state.email_address.errorMsg !== ''}
                  value={state.email_address.value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      email_address: {
                        value: e.target.value,
                        errorMsg: '',
                      },
                    })
                  }
                  size="lg"
                  placeholder="Email Address"
                />
                {state.email_address.errorMsg !== '' && (
                  <Form.Text className="invalid-feedback d-block">
                    {state.email_address.errorMsg}
                  </Form.Text>
                )}
              </Form.Group>
              {/* Phone Number */}
              <Form.Group controlId="formPhoneNumber">
                <Form.Control
                  isInvalid={state.phone_number.errorMsg !== ''}
                  value={state.phone_number.value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      phone_number: {
                        value: e.target.value,
                        errorMsg: '',
                      },
                    })
                  }
                  size="lg"
                  placeholder="Phone Number"
                />
                {state.phone_number.errorMsg !== '' && (
                  <Form.Text className="invalid-feedback d-block">
                    {state.phone_number.errorMsg}
                  </Form.Text>
                )}
              </Form.Group>
              {/* Password */}
              <Form.Group controlId="formPassword">
                <Form.Control
                  isInvalid={state.password.errorMsgs.length > 0}
                  value={state.password.value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      password: {
                        value: e.target.value,
                        errorMsgs: [],
                      },
                    })
                  }
                  size="lg"
                  placeholder="Password"
                  type="password"
                />
                {state.password.errorMsgs.length > 0 &&
                  state.password.errorMsgs.map((error) => {
                    return (
                      <Form.Text className="invalid-feedback d-block">
                        {error}
                      </Form.Text>
                    );
                  })}
              </Form.Group>
              {/* Confirm Password */}
              <Form.Group controlId="formConfirmPassword">
                <Form.Control
                  isInvalid={state.confirm_password.errorMsg !== ''}
                  value={state.confirm_password.value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      confirm_password: {
                        value: e.target.value,
                        errorMsg: '',
                      },
                    })
                  }
                  size="lg"
                  placeholder="Confirm Password"
                  type="password"
                />
                {state.confirm_password.errorMsg !== '' && (
                  <Form.Text className="invalid-feedback d-block">
                    {state.confirm_password.errorMsg}
                  </Form.Text>
                )}
              </Form.Group>

              <div className="d-flex flex-column align-items-center">
                {/* Global Error Message */}
                {globalErrorMsg !== '' && (
                  <span className="invalid-feedback d-block text-center pb-4">
                    {globalErrorMsg}
                  </span>
                )}
                {/* Submit Button */}
                <Button
                  size="lg"
                  variant="primary"
                  type="Sign In"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
