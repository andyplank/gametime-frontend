import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Routes from './components/Routing/Routes';
import reducer from './reducers/reducer';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Redux store
const store = createStore(reducer);

const App = () => {
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

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        
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
