import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import Communication from '../Communication/Communication';
import TeamManagement from '../TeamManagement/TeamManagement';
import Fundraising from '../Fundraising/Fundraising';
import Fundraiser from '../Fundraiser/Fundraiser';
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
        <Private path="/account" exact Component={Account} />
        <Private path="/home" exact Component={Home} />
        <Private path="/team" exact Component={TeamManagement} />
        <Private path="/message" exact Component={Communication} />
        {/* <Private path="/documentation" exact component={Documentation} /> */}
        <Private path="/fundraising" exact Component={Fundraising} />
        <Private path="/team/join" Component={JoinTeamPage} />
        <Route path="/fundraiser/:team_id/:user_id" component={Fundraiser} />
        <Route path="/fundraiser/:team_id" component={Fundraiser} />
        <Route path="/" exact component={Landing} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
