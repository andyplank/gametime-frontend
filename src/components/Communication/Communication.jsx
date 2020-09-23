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
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 bg-Primary">
            <div className="">
              <h4>Groups</h4>
            </div>
            <div>
              <h4>Members</h4>
            </div>
          </div>
          <div className="col-8">
            <div>
              <h4>Group Name</h4>
              <span>Group Desc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
