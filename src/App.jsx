// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import cookie from 'js-cookie';
import { getUser } from './utils/user/user';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Routes from './components/Routing/Routes';
import reducer from './reducers/reducer';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Redux store
const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const [initializing, setInitializing] = useState(true);

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
          <ScaleLoader color="#174ceb" />
        </div>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

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
