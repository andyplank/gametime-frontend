import React from "react";
import "./Landing.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";

import football from "../../assets/images/football.jpg";
import fundraising from "../../assets/icons/money-bag.svg";
import scheduling from "../../assets/icons/wall-clock.svg";
import messaging from "../../assets/icons/messages.svg";
import documentation from "../../assets/icons/documents.svg";
import rosters from "../../assets/icons/schedule.svg";
import apparel from "../../assets/icons/shopping-cart.svg";

const Landing = () => {
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <Col md={6} className="my-auto">
              <div>
                <span className="mission-heading">
                  Streamlined Team Management for Coaches, Parents, and Athletes
                </span>
                <span className="mission-subheading">
                  GameTime helps you spend less time managing logistics, and
                  more time enjoying the field
                </span>
              </div>
            </Col>
            <Col md={6}>
              <img
                src={football}
                className="w-100"
                alt="Highschool Football Game"
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container className="text-center">
        <h1>What We Offer</h1>
        <Row>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={fundraising} alt="Money Bag" />
            <h3 className="mt-2">Fundraising</h3>
          </Col>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={scheduling} alt="Clock" />
            <h3 className="mt-2">Scheduling</h3>
          </Col>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={messaging} alt="Messages" />
            <h3 className="mt-2">Messaging</h3>
          </Col>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={documentation} alt="Documents" />
            <h3 className="mt-2">Document Management</h3>
          </Col>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={rosters} alt="Team Roster" />
            <h3 className="mt-2">Team Rosters</h3>
          </Col>
          <Col xs={6} md={4} className="py-4">
            <img className="grid-image" src={apparel} alt="Shopping Cart" />
            <h3 className="mt-2">Apparel and Sportswear</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
