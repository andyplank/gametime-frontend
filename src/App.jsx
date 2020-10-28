import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';

import Routes from './components/Routing/Routes';
import reducer from './reducers/reducer';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Redux store
const store = createStore(reducer);

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        
        <Routes />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
