import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import Communication from '../Communication/Communication';
import Register from '../Register/Register';
import TeamManagement from '../TeamManagement/TeamManagement';
import JoinTeamPage from '../TeamManagement/JoinTeamPage';
import NotFound from './NotFound';
import Private from './Private';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Routes = () => {

  return (
    <div className="full-screen">
      <Header />
      <Switch>
        {/* <Route path="/logout" exact component={Logout} /> */}
        <Route path="/register" exact component={Register} />
        <Route path="/account" exact component={Account} />
        <Route path="/home" exact component={Home} />
        <Route path="/team" exact component={TeamManagement} />
        <Private path="/message" exact Component={Communication} />
        {/* <Route path="/documentation" exact component={Documentation} /> */}
        {/* <Route path="/resources" exact component={Resources} /> */}
        <Route path="/joinTeam" exact component={JoinTeamPage} />
        <Route path="/" exact component={Landing} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
