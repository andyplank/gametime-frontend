import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import sendEmail from '../../utils/email/email';
import './Email.css';

const Email = () => {
    function selector(store) {
        return {
          first_name: store.user.first_name,
          last_name: store.user.last_name,
          teams: store.user.teams,
          selected: store.status.selected_team,
        };
      }
    const state = useSelector(selector);

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [success, setSuccess] = useState(null);

    const emailTemplate = () => {
        return (
            `Hello!

            My name is ${state.first_name} ${state.last_name} and im a player on the team, ${state.teams[state.selected].name}.

            Would you be willing to make a contribution to my fundrasier? A purchase of any amount would mean the world to me and my team!

            To donate, simply click the link to my fundraiser below:

            [LINK HERE]
            
            Sincerely,
            ${state.first_name} ${state.last_name}
        `)
    }
    function validateEmail(mail) 
    {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
        {
            setIsValid(true);
            return true;
        }
        setIsValid(false);
        return false;

    }

    async function handleEmailSend(){
        if(validateEmail(email)){
            if(sendEmail(email, "Fundraiser", emailTemplate())){
                setSuccess(true);
            }
            else{
                setSuccess(false);
            }
        }
    }

    return (
      <div className="display">
        <Form onSubmit={false}>
          <Form.Group className="py-2" controlId="formBasicEmail">
            <Form.Label className="login-form-label">
              Send Fundraiser Info
            </Form.Label>
            <div className="txtbox">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isValid}
                size="lg"
                placeholder="Enter email"
              />
              &nbsp;
              <Button onClick={handleEmailSend}>Send</Button>
            </div>
            {success != null && 
              (
                <span className={success ? "email-success" : "email-error"}>
                  {success ? "Email sent successfully" : "Oops! Something went wrong"}
                </span>
			  )
            }
          </Form.Group> 
        </Form>
      </div>
    );
}

export default Email;