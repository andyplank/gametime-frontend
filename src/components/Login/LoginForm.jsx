import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import login from '../../utils/auth/auth';
import { getUser } from '../../utils/user/user';

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const state = useSelector((store) => {
        return { signed_in: store.status.signed_in };
    });
    
    if (state.signed_in) {
        history.push('/');
    }

    async function onSubmit(data) {     
        // Do not allow multiple outstanding requests
        if (loading) {
          return;
        }

        // Clear any pre-existing error messages, and mark as loading
        setLoading(true);
        setErrorMsg('');
    
        // Query login API
        const { message, error, success } = await login(data.email, data.password);
    
        if (!error && success) {
            const res = await getUser();
            if (!res.error && res.success) {
                const newState = {
                    user: res.user,
                    status: {
                            signed_in: true,
                            selected_team: 0,
                        },
                    };
                dispatch({ type: 'SET_STATE', payload: newState });
                history.push('/');
            }
        } else {
          setErrorMsg(message);
          setLoading(false);
        }
    }

    return (
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="py-2">
          <Form.Label className="login-form-label">Email</Form.Label>
          <Form.Control 
            type="text"
            name="email"
            size="lg"
            isInvalid={errors.email}
            ref={register({
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                  }
                )}
          />
        </Form.Group>

        <Form.Group className="py-2">
          <Form.Label className="login-form-label">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            size="lg"
            isInvalid={errors.password}
            ref={register({
                      required: "Required",
                  }
                )}
          />
        </Form.Group>
              
        <div className="d-flex flex-column align-items-center">
          <span className="invalid-feedback d-block text-center pb-4">
            {errorMsg}
          </span>
          <div className="py-2">
            <Button
              className="px-3 py-2"
              size="lg"
              variant="primary"
              type="Sign In"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Form>
    );
};

export default LoginForm;
