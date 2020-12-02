/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Button, Container, Carousel, Col, Row} from 'react-bootstrap';
import './Home.scss';
import { Link, useParams} from 'react-router-dom';
import Contact from './Contact';

import StoreImage from '../../assets/images/store.jpg';
import FundImage from '../../assets/images/charity.jpg';
import PhotoImage from '../../assets/images/photos.jpg';
import ApproveImage from '../../assets/images/approve.jpg';


import { fetchSponsorships, fetchPromotions } from '../../utils/business/business';

const Home = () => {

  const { team_id } = useParams();
  const [banners, setBanners] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const refresh = async () => {
    await fetchSponsorships(setBanners, team_id);
    await fetchPromotions(setPromotions, team_id);
  }

  useEffect(() => {
    refresh();
  }, [team_id])

  useEffect(() => {
    const filtered = promotions.filter((elm) => {
      return new Date(elm.start_time).getTime() < Date.now() && new Date(elm.end_time).getTime() > Date.now();
    });
    if(filtered.length !== promotions.length) {
      setPromotions(filtered);
    }
  }, [promotions])

  const bannerContent = banners.map((elm, index) => {
    return (
      <Carousel.Item key={elm.sponsor_id}>
        <img
          className="d-block w-100"
          src={elm.picture}
          alt={`${index}-banner`}
        />
      </Carousel.Item>
    );
  });

  const promoContent = promotions.map((elm, index) => {
    return (
      <Carousel.Item key={elm.promotion_id}>
        <img
          className="d-block w-100"
          src={elm.picture}
          alt={`${index}-promo`}
        />
        <Carousel.Caption>
          <h3>{elm.name}</h3>
          <p>{elm.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  })

  return (
    <div className="fill-vert">
      <Carousel controls={false} indicators={false} interval={2000} className="banner">
        {bannerContent}
      </Carousel>
      <Jumbotron className="text-center">
        <h2>Team Page</h2>
      </Jumbotron>
      <Container>

        <Row className="py-2">
          <Col md={6} className="py-1">
            <Link to={`/team/${team_id}/fundraiser/`} className="no-link">
              <img src={FundImage} alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white"><h3>Team Fundraiser</h3></div>
            </Link>
          </Col>
          <Col md={6} className="py-1">
            <Link to={`/team/${team_id}/photos/`} className="no-link">
              <img src={PhotoImage} alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white"><h3>Photos</h3></div>
            </Link>
          </Col>
          <Col md={6} className="py-1">
            <Link to={`/team/${team_id}/photos/approve/`} className="no-link">
              <img src={ApproveImage} alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white">
                <h3>
                  Approve Photos 
                  <br /> 
                  (Admins Only)
                </h3>
              </div>
            </Link>
          </Col>
          <Col md={6} className="py-1">
            <Link to={`/team/${team_id}/store/`} className="no-link">
              <img src={StoreImage} alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white"><h3>Team Store</h3></div>
            </Link>
          </Col>
        </Row>

        {promotions.length !== 0 && (
          <div className="text-center py-4">
            <h5>Promotions!</h5>
            <Carousel className="promo">
              {promoContent}          
            </Carousel>
          </div>
          )
        }
        <Contact />
      </Container>
    </div>
  );
};

export default Home;
