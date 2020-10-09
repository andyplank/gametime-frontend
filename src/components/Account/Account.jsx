/* eslint-disable */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Jumbotron } from 'react-bootstrap';
import { MdAccountCircle, MdClose, MdArrowForward } from 'react-icons/md';
import Header from '../Header/Header';
import { addPhoneNumber, removePhoneNumber } from '../../utils/user/user';
import './Account.scss';

const Account = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
  function selector(store) {
    return {
      id: store.user.id,
      first_name: store.user.first_name,
      last_name: store.user.last_name,
      email_address: store.user.email_address,
      default_phone_number: store.user.default_phone_number,
      optional_phone_numbers: store.user.optional_phone_numbers,
      teams: store.user.teams,
    };
  }
  const state = useSelector(selector);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');

  async function onRemoveNumber(target) {
    // Call API to delete number
    const result = await removePhoneNumber(state.id, target);
    if (result) {
      dispatch({ type: 'REMOVE_PHONE_NUMBER', payload: target });
    }
  }

  async function onAddNumber(target) {
    // Call API to add number
    const result = await addPhoneNumber(state.id, target);
    if (result) {
      dispatch({ type: 'ADD_PHONE_NUMBER', payload: target });
    }
  }
  const iconSize = 256;

  return (
    <div className="">
      <Jumbotron className="">
        <div className="row justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <MdAccountCircle size={iconSize} />
            <span className="account-title">{`${state.first_name} ${state.last_name}`}</span>
          </div>
        </div>
      </Jumbotron>
      <div>
        <div className="py-3 px-3">
          <span className="d-block py-2 account-heading">My Information</span>
          <span className="d-block col-md-3 account-subheading">
            First Name:&nbsp;
            {state.first_name}
          </span>
          <span className="d-block col-md-3 account-subheading">
            Last Name:&nbsp;
            {state.last_name}
          </span>
          <span className="d-block col-md-3 account-subheading">
            Email:&nbsp;
            {state.email_address}
          </span>
        </div>
        {/* Phone Number Section */}
        <div className="py-3 px-3">
          <span className="d-block py-2 account-heading">
            Registered Phone Numbers
          </span>
          {state.optional_phone_numbers.map((num) => {
            return (
              <PhoneNumberRow
                number={number}
                onClick={() => onRemoveNumber(num)}
              />
            );
          })}
          <div className="col-md-3">
            <div className="d-flex align-items-center justify-content-between">
              <Form noValidate>
                <Form.Group className="py-2 mb-0" controlId="formPhoneNumber">
                  <Form.Control
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    // isInvalid={errorMsg !== ''}
                    size="lg"
                    placeholder="Add a number"
                  />
                </Form.Group>
              </Form>
              <MdArrowForward size={50} onClick={() => onAddNumber(number)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneNumberRow = (props) => {
  const { number, onClick } = props;
  const iconSize = 50;

  return (
    <div className="col-md-3">
      {/* <div className="row no-gutters"> */}
      {/* <div className="d-flex justify-content-space-between"> */}
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="account-phone-number px-3">{number}</span>
          <div onClick={() => onClick(number)}>
            <MdClose size={iconSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;