import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AuthContext from './common/context/auth';
import reducer from './reducers/reducer';
import Landing from './components/Landing/Landing';
import Communication from './components/Communication/Communication';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import TeamManagement from './components/TeamManagement/TeamManagement';


// Initialize Redux store
const store = createStore(reducer);

const App = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const login = () => setAuth(!isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login
      }}
    >
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/login" exact component={Login} /> */}
          {/* <Route path="/logout" exact component={Logout} /> */}
          {/* <Route path="/register" exact component={Register} /> */}
          {/* <Route path="/account" exact component={Account} /> */}
          {/* <Route path="/home" exact component={Home} /> */}
          <Route path="/communication" exact component={Communication} />
          {/* <Route path="/documentation" exact component={Documentation} /> */}
          {/* <Route path="/resources" exact component={Resources} /> */}
          <Route path="/" exact component={Landing} />
        </Switch>
        <Route path="/TeamManagement" exact component={TeamManagement} />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
