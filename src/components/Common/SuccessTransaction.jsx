import React, { useEffect } from "react";

import { Container, Button, } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import { confirmTransaction } from '../../utils/store/store';

const SuccessTransaction = () => {

  const { team_id, transaction_id }  = useParams();

  useEffect(() => {
    confirmTransaction(transaction_id)
  }, [team_id])

  return (
    <div className="fill-vert">
      <div className="text-center quarter">
        <Container className="pb-4 mb-4">
          <h2>Success!</h2>
          <h4>Thank you!</h4>
          <div className="my-3">
            <Link to={`/team/${team_id}/home`} className="no-link">
              <Button variant="outline-secondary">Return to team home</Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default SuccessTransaction;
