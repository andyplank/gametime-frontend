/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Button, Container, Carousel, Col, Row} from 'react-bootstrap';
import './Home.scss';
import { Link, useParams} from 'react-router-dom';
import Contact from './Contact';

import { fetchSponsorships } from '../../utils/business/business';

const Home = () => {

  const { team_id } = useParams();
  const [banners, setBanners] = useState([{sponsor_id: 1, link: 'https://i.imgur.com/KGK9Y2V.jpg'}, {sponsor_id: 2, link: 'https://i.imgur.com/KGK9Y2V.jpg'}]);
  const [promotions, setPromotions] = useState(['https://i.imgur.com/KGK9Y2V.jpg', 'https://i.imgur.com/KGK9Y2V.jpg']);

  const refresh = async () => {
    await fetchSponsorships(setBanners, team_id);
  }

  useEffect(() => {
    refresh();
  }, [team_id])

  const bannerContent = banners.map((elm, index) => {
    return (
      <Carousel.Item key={elm.sponsor_id}>
        <img
          className="d-block w-100"
          src={elm.link}
          alt={index}
        />
      </Carousel.Item>
    );
  });

  return (
    <div className="fill-vert">
      <Carousel controls={false} indicators={false} interval={2000}>
        {bannerContent}
      </Carousel>
      <Jumbotron className="text-center">
        <h2>Team Page</h2>
      </Jumbotron>
      <Container>

        <Row className="py-3">
        
          <Col md={6}>
            <Link to={`/team/${team_id}/fundraiser/`} className="no-link">

              <img src="https://www.halo.com/blog/wp-content/uploads/2020/01/pic-05-charity-1024x439.jpg" alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white"><h3>Team Fundraiser</h3></div>
            </Link>
          </Col>

          <Col md={6}>
            <Link to={`/team/${team_id}/store/`} className="no-link">
              <img src="https://www.halo.com/blog/wp-content/uploads/2020/01/pic-05-charity-1024x439.jpg" alt="Snow" className="w-100 grayscale rounded" />
              <div className="centered text-white"><h3>Team Store</h3></div>
            </Link>
          </Col>
        
        </Row>

        <Contact />

      </Container>
    </div>
  );
};

export default Home;
