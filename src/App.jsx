import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import AuthContext from './common/context/auth';

// page imports
import Home from './components/Home/Home';
import Communication from './components/Communication/Communication';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

const App = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const login = () => setAuth(!isAuthenticated);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
    }}
    >
      <Router>
        <Header />
        <Route path="/comm" exact component={Communication} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app-root'));
