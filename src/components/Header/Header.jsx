import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MdMenu } from 'react-icons/md';
import PropTypes from 'prop-types';
import Menu from './Menu';

// function mapDispatchToProps(dispatch) {
//   return {
//     setUser: (object) => {
//       dispatch({ type: 'SET_USER', payload: object });
//     }
//   };
// }

const Header = () => {
  function selector(store) {
    return {
      firstName: store.user.firstName,
      lastName: store.user.lastName,
      role: store.user.teams[store.status.selectedTeam].roles[0],
      teams: store.user.teams,
      signedIn: store.status.signedIn
    };
  }

  const storeState = useSelector(selector);

  return storeState.signedIn ? (
    <SignedInHeader {...storeState} />
  ) : (
    <SignedOutHeader />
  );
};

const SignedOutHeader = () => {
  const history = useHistory();

  function onClick() {
    history.push('/login');
  }

  return (
    <Navbar>
      <Navbar.Brand style={{ fontFamily: 'SignPainter', fontSize: 42 }}>
        <Link to="/" className="text-decoration-none text-reset">
          GameTime
        </Link>
      </Navbar.Brand>
      <div className="ml-auto mr-sm-2">
        <Button className="ml-auto" variant="primary" onClick={onClick}>
          Sign In
        </Button>
      </div>
    </Navbar>
  );
};

const SignedInHeader = (props) => {
  const { teams } = props;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);

  function getSelectOptions() {
    return teams.map((team, index) => {
      return { label: team.name, value: index };
    });
  }

  return (
    <>
      {/* Navigation Header */}
      <Navbar className="border-bottom border-light">
        <Navbar.Brand style={{ fontFamily: 'SignPainter', fontSize: 42 }}>
          <Link to="/home" className="text-decoration-none text-reset">
            GameTime
          </Link>
        </Navbar.Brand>
        <div style={{ display: 'flex' }} className="ml-auto align-items-center">
          <div style={{ width: '20rem' }}>
            <Select
              styles={selectStyles}
              placeholder={teams[selected].name}
              value={teams[selected].name}
              onChange={(item) => setSelected(item.value)}
              options={getSelectOptions()}
            />
          </div>
          <div>
            <MdMenu
              className="ml-3"
              size={32}
              onClick={() => setVisible((isVisible) => !isVisible)}
            />
          </div>
        </div>
      </Navbar>
      {/* Toggle-able Menu */}
      {visible && <Menu {...props} />}
    </>
  );
};

const selectStyles = {
  // Menu: The modal card which contains all of the available options
  menu: (base) => ({
    ...base,
    color: 'black'
  }),
  // indicatorSeparator: The vertical | separating the dropdownIndicator from the placeholder
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'black'
  }),
  // option: A row element within the menu
  option: (base) => ({
    ...base,
    color: 'black'
  }),
  // control: The parent select dropdown box
  control: (base) => ({
    ...base,
    color: 'black',
    border: '1px solid black'
  }),
  // singleValue: The value displayed in control once an element has been selected
  singleValue: (base) => ({
    ...base,
    color: 'black'
  }),
  // placeholder: The original value displayed in control
  placeholder: (base) => ({
    ...base,
    color: 'black'
  }),
  // dropdownIndicator: The right-hand side downward pointing caret
  dropdownIndicator: (base) => ({
    ...base,
    color: 'black'
  })
};

SignedInHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  signedIn: PropTypes.bool.isRequired
};

export default Header;
