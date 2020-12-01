import React from "react";

import { Container, Button, } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const SuccessPurchase = () => {

    const { team_id }  = useParams();

    return (
      <div className="text-center quarter">
        <Container className="pb-4 mb-4">
          <h2>Success!</h2>
          <h4>Your order has been placed</h4>
          <div className="my-3">
            <Link to={`/team/${team_id}/store/`} className="no-link">
              <Button variant="outline-secondary">Return to store</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
}

export default SuccessPurchase;
