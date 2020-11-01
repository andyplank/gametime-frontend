import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MdMenu } from 'react-icons/md';
import Menu from './Menu';

const Header = () => {
  function selector(store) {
    return {
      signed_in: store.status.signed_in,
    };
  }

  const storeState = useSelector(selector);

  return storeState.signed_in ? <SignedInHeader /> : <SignedOutHeader />;
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

const SignedInHeader = () => {
  function selector(store) {
    let role = 'Member';
    if (store.user.teams.length > 0) {
      const perm_level =
        store.user.teams[store.status.selected_team].permission_level;
      if (perm_level === 2) role = 'Owner';
      else if (perm_level === 1) role = 'Administrator';
      else if (perm_level === 0) role = 'Player';
    }

    return {
      first_name: store.user.first_name,
      last_name: store.user.last_name,
      role: role,
      teams: store.user.teams,
      selected: store.status.selected_team,
    };
  }

  const storeState = useSelector(selector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  // const [selected, setSelected] = useState(0);
  const { teams, selected } = storeState;

  function setSelected(index) {
    dispatch({ type: 'SET_SELECTED_TEAM', payload: index });
  }

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
            {teams.length > 0 && (
              <Select
                styles={selectStyles}
                placeholder={teams[selected].name}
                // value={teams[selected].name}
                onChange={(item) => setSelected(item.value)}
                options={getSelectOptions()}
              />
            )}
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
      {visible && <Menu {...storeState} />}
    </>
  );
};

const selectStyles = {
  // Menu: The modal card which contains all of the available options
  menu: (base) => ({
    ...base,
    color: 'black',
  }),
  // indicatorSeparator: The vertical | separating the dropdownIndicator from the placeholder
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'black',
  }),
  // option: A row element within the menu
  option: (base) => ({
    ...base,
    color: 'black',
  }),
  // control: The parent select dropdown box
  control: (base) => ({
    ...base,
    color: 'black',
    border: '1px solid black',
  }),
  // singleValue: The value displayed in control once an element has been selected
  singleValue: (base) => ({
    ...base,
    color: 'black',
  }),
  // placeholder: The original value displayed in control
  placeholder: (base) => ({
    ...base,
    color: 'black',
  }),
  // dropdownIndicator: The right-hand side downward pointing caret
  dropdownIndicator: (base) => ({
    ...base,
    color: 'black',
  }),
};

export default Header;
