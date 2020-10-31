import React, {useContext} from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import StoreContext from './context';

const Cart = () => {

    const { cart, removeCart } = useContext(StoreContext);
    const { teamId }  = useParams();

    const handleRemove = (index) => {
      removeCart(index);
    }

    const items = cart.map((elm, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={`cart-item-${index}`} className="py-2">
        <Col>
          {elm.name}
        </Col>
        <Col>
          {elm.type}
        </Col>
        <Col>
          $
          {elm.price}
        </Col>
        <Col>
          <Button onClick={() => handleRemove(index)}>Remove</Button>
        </Col>
      </Row>
    ));

    return (
      <div>
        <Jumbotron className="text-center">

          {cart.length !== 0 
          ? (
            <div>
              <h2 className="pb-2">Ready to checkout?</h2>
              <Link to={`/${teamId}/store/checkout`} className="no-link">
                <Button variant="outline-primary">Checkout</Button>
              </Link>
            </div>
          ) 
          : (
            <h2 className="py-4">
              There are no items in your cart!
            </h2>
          )}
          
        </Jumbotron>
        <div className="text-center">
          <Container>
            { items }
          </Container>
        </div>
        <div className="text-center py-4">
          <Link to={`/${teamId}/store/`} className="no-link">
            <Button variant="outline-secondary">Return to store</Button>
          </Link>
        </div>
      </div>
    );
};

export default Cart;
