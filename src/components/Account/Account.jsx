/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Jumbotron } from 'react-bootstrap';
import { MdAccountCircle, MdClose, MdArrowForward } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import {
  addPhoneNumber,
  removePhoneNumber,
  getProfilePicture,
  setProfilePicture,
} from '../../utils/user/user';
import './Account.scss';
import { removeFromTeam, createTeam } from '../../utils/team/team';
import UploadPicture from '../UploadPicture/UploadPicture';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const CreateTeamModal = () => {
  function selector(store) {
    return {
      id: store.user.id ? store.user.id : 1,
      teams: store.user.teams,
    };
  }

  const dispatch = useDispatch();
  const state = useSelector(selector);

  const [show, setShow] = useState(false);
  const [teamNameError, setTeamNameError] = useState(false);
  const [teamName, setTeamName] = useState('');

  function handleCreateClose() {
    setTeamName("");
    setShow(false);
  }

  async function handleSaveTeamCreate() {
    if (teamName && teamName.length > 0 && teamName.length <= 30) {
      let team_id = await createTeam(state.id, teamName);
      const newTeam = { name: teamName, permission_level: 2, team_id: team_id };
      dispatch({ type: 'SET_TEAMS', payload: state.teams.concat(newTeam) });
      setTeamName('');
      setShow(false);
    } else {
      setTeamNameError(true);
    }
  }

  return (
    <div style={{ paddingLeft: '3%' }}>
      <Button
        className="btn-team"
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setShow(true)}
      >
        Create Team
      </Button>
      <Modal show={show} onHide={() => handleCreateClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ paddingBottom: '5%' }}>
              <TextField
                variant="outlined"
                label="Team Name"
                error={teamNameError}
                onChange={(event) => setTeamName(event.target.value)}
                helperText={teamNameError ? '0 < Team Name <= 30' : ''}
                value={teamName}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCreateClose()}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSaveTeamCreate()}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const Account = () => {
  function selector(store) {
    return {
      id: store.user.id ? store.user.id : 1,
      first_name: store.user.first_name,
      last_name: store.user.last_name,
      email_address: store.user.email_address,
      default_phone_number: store.user.default_phone_number,
      extra_phone_numbers: store.user.extra_phone_numbers,
      teams: store.user.teams,
    };
  }
  const state = useSelector(selector);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [profPicture, setProfPicture] = useState(null);

  async function getPic() {
    let p = await getProfilePicture(state.id);
    setProfPicture(p);
  }

  useEffect(() => {
    getPic();
  },[])

  async function onRemoveNumber(target) {
    // Call API to delete number
    const result = await removePhoneNumber(state.id, target);
    if (result) {
      dispatch({ type: 'REMOVE_PHONE_NUMBER', payload: target });
    }
  }

  async function onRemoveTeam(target) {
    const result = await removeFromTeam(target.team_id, state.id);
    if (result) {
      dispatch({
        type: 'SET_TEAMS',
        payload: state.teams.filter((t) => t.team_id != target.team_id),
      });
    }
  }

  async function onAddNumber(target) {
    // Call API to add number
    setErrorMsg('');
    const message = await addPhoneNumber(state.id, target);
    if (message === '') {
      dispatch({ type: 'ADD_PHONE_NUMBER', payload: target });
    } else {
      setErrorMsg(message);
    }
  }

  async function onSavePicture(picture) {
    const formattedPicture = `data:image/jpeg;base64,${picture}`;
    setProfilePicture(state.id, formattedPicture, profPicture == null);
    setProfPicture(formattedPicture);
  }

  const iconSize = 256;

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));

  const classes = useStyles();

  return (
    <div className="page">
      <Jumbotron className="">
        <div className="row justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <Avatar
              alt="pic"
              src={`${profPicture}`}
              className={classes.large}
            />
            <span className="account-title">
              {`${state.first_name} 
                ${state.last_name ? state.last_name : ''}
                `}
            </span>
            <UploadPicture savePicture={onSavePicture} />
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
          {state.extra_phone_numbers.map((num) => {
            return (
              <PhoneNumberRow
                number={num}
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
                    isInvalid={errorMsg !== ''}
                    size="lg"
                    placeholder="Add a number"
                  />
                </Form.Group>
              </Form>
              <MdArrowForward size={50} onClick={() => onAddNumber(number)} />
            </div>
            {errorMsg !== '' && (
              <span className="invalid-feedback d-block">{errorMsg}</span>
            )}
          </div>
          <div className="py-3 px-3">
            <span className="d-block py-2 account-heading">
              {state.teams.length > 0 ? (
                <p>Teams</p>
              ) : (
                <p>You have not joined any teams.</p>
              )}
            </span>
            {state.teams.map((team) => {
              return (
                <PhoneNumberRow
                  number={team.name}
                  onClick={() => onRemoveTeam(team)}
                />
              );
            })}
          </div>
          <CreateTeamModal />
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
