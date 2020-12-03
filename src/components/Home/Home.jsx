import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container, Carousel, Col, Row } from 'react-bootstrap';
import './Home.scss';
import { Link, useParams} from 'react-router-dom';
import Contact from './Contact';
import TeamPhotos from '../TeamPhotos/TeamPhotos';

import StoreImage from '../../assets/icons/shopping-cart.svg';
import FundImage from '../../assets/icons/money-bag.svg';

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
      <Carousel controls={false} indicators={false} className="banner">
        {bannerContent}
      </Carousel>
      <Jumbotron className="text-center">
        <h2>Team Page</h2>
      </Jumbotron>
      <Container>

        <Row className="py-2">
          <Col md={6} className="py-1 text-center">
            <Link to={`/team/${team_id}/fundraiser/`} className="no-link">
              <div><h3>Fundraiser</h3></div>
              <img src={FundImage} alt="fundraiser" className="w-100 home-icons" />
            </Link>
          </Col>
          <Col md={6} className="py-1 text-center">
            <Link to={`/team/${team_id}/store/`} className="no-link">
              <div><h3>Store</h3></div>
              <img src={StoreImage} alt="cart" className="w-100 home-icons" />
            </Link>
          </Col>
        </Row>

        {promotions.length !== 0 && (
          <div className="text-center py-4">
            <h3 className="pb-2">Promotions</h3>
            <Carousel className="promo">
              {promoContent}          
            </Carousel>
          </div>
          )
        }

        <div className="py-4 gallery">
          <h3 className="text-center">Photos</h3>
          <TeamPhotos />
        </div>

        <Contact />
      </Container>
    </div>
  );
};

export default Home;
