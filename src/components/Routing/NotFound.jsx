import React from 'react'
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="fill-vert">
        <Jumbotron className="text-center">
          <h1>Whoops!</h1>
          <h3>It looks like this page does not exist</h3>          
          <div className="mt-3">
            <Link to="/" className="no-link">
              <Button variant="outline-secondary">Return home</Button>
            </Link>
          </div>
        </Jumbotron>
        <div className="text-center">
          <h4>Blame one of these guys</h4>
          <Container className="py-4">
            <Row>
              <Col>
                <img className="rounded-circle" alt="Trevor" src="https://media-exp1.licdn.com/dms/image/C4E03AQFHe1s3VU0yRQ/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=UHXCur1gktintSazPTHCwLUC3kvqBP-kchHptbuw5ds" />
              </Col>
              <Col>
                <img className="rounded-circle" alt="Collin" src="https://media-exp1.licdn.com/dms/image/C4E03AQHvMLkUHkx3Ug/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=rjJPRIvm423Z_sbYs3WBrhRaU4Gxi_C88B1dYViWS0E" />
              </Col>
              <Col>
                <img className="rounded-circle" alt="Andy" src="https://media-exp1.licdn.com/dms/image/C4E03AQGSl30dbzy0uw/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=aY9QPUJCxNk5VUh1O0oB1v5ZWltorCtybx8dzbVU-Pc" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
};

export default NotFound
