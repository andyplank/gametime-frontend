/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Email.css';

const emailTemplate = (data) => {
    return "";
}

const Email = (props) => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleEmailSend(){
        console.log("email", email);
    }

    return (
        <Form onSubmit={false}>
            <Form.Group className="py-2" controlId="formBasicEmail">
                <Form.Label className="login-form-label">
                    Send Fundraiser Info
                </Form.Label>
                <div className="txtbox">
                    <Form.Control
                        className="txtbox"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={errorMsg !== ''}
                        size="lg"
                        placeholder="Enter email"
                    />
                    &nbsp;
                    <Button onClick={handleEmailSend}>Send</Button>
                </div>
            </Form.Group> 
            
        </Form>
    );
}

export default Email;