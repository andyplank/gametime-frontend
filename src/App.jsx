/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cookie from 'js-cookie';
import { getUser } from './utils/user/user';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';

import Routes from './components/Routing/Routes';
import reducer from './reducers/reducer';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Redux store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const [initializing, setInitializing] = useState(true);

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#0275d8',
        main: '#0275d8',
        dark: '#0275d8',
        contrastText: '#fff',
      },
      secondary: {
        light: '#0275d8',
        main: '#0275d8',
        dark: '#0275d8',
        contrastText: '#000',
      },
    },
  });


  async function initStore() {
    if (cookie.get('access_token') == null) {
      setInitializing(false);
      return;
    }

    const { success, error, user } = await getUser();
    if (success && !error) {
      const state = {
        user: user,
        status: {
          signed_in: true,
          selected_team: 0,
        },
      };
      store.dispatch({ type: 'SET_STATE', payload: state });
    }
    setInitializing(false);
  }

  useEffect(() => {
    initStore();
  }, []);

  if (initializing) {
    return (
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="fundraiser-loader">
          <CircularProgress/>
        </div>
      </div>
    );
  } 

  return (
    <MuiThemeProvider theme={theme}>
    <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Landing} />
          <Routes />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
