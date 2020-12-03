import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import Home from '../Home/Home';
import Communication from '../Communication/Communication';
import Business from '../Business/Business';
import TeamManagement from '../TeamManagement/TeamManagement';
import Fundraising from '../Fundraising/Fundraising';
import Fundraiser from '../Fundraiser/Fundraiser';
import TeamFund from '../Fundraiser/TeamFund';
import Orders from '../Orders/Orders';
import JoinTeamPage from '../TeamManagement/JoinTeamPage';
import Management from '../Store/Management';
import Store from '../Store/Store';
import Documentation from '../Documentation/Documentation';
import TeamPhotos from '../TeamPhotos/TeamPhotos';
import ApprovePhotos from '../TeamPhotos/ApprovePhotos';
import NotFound from './NotFound';
import Private from './Private';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Routes = () => {
  return (
    <div className="full-screen">
      <Header />
      <Switch>
        <Private path="/account" exact Component={Account} />
        <Private path="/join/:team_id" Component={JoinTeamPage} />
        <Private path="/message" exact Component={Communication} />
        <Private path="/manage/team" exact Component={TeamManagement} />
        <Private path="/manage/orders" exact Component={Orders} />
        <Private path="/manage/store" exact Component={Management} />
        <Private path="/manage/fundraiser" exact Component={Fundraising} />
        <Private path="/manage/documentation" exact Component={Documentation} />
        <Private path="/manage/business" exact Component={Business} />
        
        <Route path="/team/:team_id/photos/approve" exact component={ApprovePhotos} />
        <Route path="/team/:team_id/photos" exact component={TeamPhotos} />
        <Route path="/team/:team_id/fundraiser" exact component={TeamFund} />
        <Route path="/team/:team_id/fundraiser/:user_id" component={Fundraiser} />
        <Route path="/team/:team_id/store/" component={Store} />
        <Route path="/team/:team_id/home" component={Home} />
        <Route path="/notFound" exact component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
