import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import Home from '../Home/Home';
import Communication from '../Communication/Communication';
import TeamManagement from '../TeamManagement/TeamManagement';
import Orders from '../Orders/Orders';
import JoinTeamPage from '../TeamManagement/JoinTeamPage';
import Management from '../Store/Management';
import Store from '../Store/Store';
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
        <Private path="/message" exact Component={Communication} />    
        <Private path="/manage/team" exact Component={TeamManagement} />
        <Private path="/manage/orders" exact Component={Orders} />
        <Private path="/manage/store" exact Component={Management} />
           
        {/* <Route path="/documentation" exact component={Documentation} /> */}
        {/* <Route path="/resources" exact component={Resources} /> */}
        
        <Route path="/:teamId/store/" component={Store} />
        <Route path="/:teamId/home" component={Home} />
        <Private path="/team/join" Component={JoinTeamPage} /> 
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
