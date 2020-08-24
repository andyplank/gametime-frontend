import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// page imports
import Home from './components/Home/Home';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app-root'));
