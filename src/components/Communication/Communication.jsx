import React, { useContext } from 'react';
import './Communication.scss';
import AuthContext from '../../common/context/auth';

const Communication = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>
        {isAuthenticated ? 'Lets chat!' : 'You must login first'}
      </h1>
    </div>
  );
};

export default Communication;
