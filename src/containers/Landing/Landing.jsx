import React from 'react';
import './Landing.scss';
import Header from '../../components/Header/Header';
import football from '../../assets/images/football.jpg';
import fundraising from '../../assets/icons/money-bag.svg';
import scheduling from '../../assets/icons/wall-clock.svg';
import messaging from '../../assets/icons/messages.svg';
import documentation from '../../assets/icons/documents.svg';
import rosters from '../../assets/icons/schedule.svg';
import apparel from '../../assets/icons/shopping-cart.svg';

const Landing = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};

const Content = () => {
  return (
    <div>
      <div className="banner">
        <div className="row">
          <div className="col left">
            <span className="mission-heading">
              Streamlined Team Management for Coaches, Parents, and Athletes
            </span>
            <span className="mission-subheading">
              GameTime helps you spend less time managing logistics, and more
              time enjoying the field
            </span>
          </div>
          <div className="col right">
            <img src={football} height="300px" alt="Highschool Football Game" />
          </div>
        </div>
      </div>
      <div className="grid-wrapper">
        <div className="grid">
          <span className="services-heading">What We Offer</span>
          <div className="row">
            <div className="col grid-element">
              <img className="grid-image" src={fundraising} alt="Money Bag" />
              <span className="grid-heading">Fundraising</span>
            </div>
            <div className="col grid-element">
              <img className="grid-image" src={scheduling} alt="Clock" />
              <span className="grid-heading">Scheduling</span>
            </div>
            <div className="col grid-element">
              <img className="grid-image" src={messaging} alt="Messages" />
              <span className="grid-heading">Messaging</span>
            </div>
          </div>
          <div className="row">
            <div className="col grid-element">
              <img className="grid-image" src={documentation} alt="Documents" />
              <span className="grid-heading">Documentation and Waivers</span>
            </div>
            <div className="col grid-element">
              <img className="grid-image" src={rosters} alt="Team Roster" />
              <span className="grid-heading">Team Rosters</span>
            </div>
            <div className="col grid-element">
              <img className="grid-image" src={apparel} alt="Shopping Cart" />
              <span className="grid-heading">Apparel and Sportswear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
