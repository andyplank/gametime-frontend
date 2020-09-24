import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';


const Header = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/comm">Communicate</Link>
      </li>
      <li>
        <Link to="/TeamManagement">Team Management</Link>
      </li>
    </ul>
  </div>
);

export default Header;
