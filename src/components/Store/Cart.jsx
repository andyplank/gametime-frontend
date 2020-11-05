import React, {useContext} from 'react';
import { Form, Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import StoreContext from './context';

const Cart = () => {

    const { cart, removeCart, updateQuantity } = useContext(StoreContext);
    const { team_id }  = useParams();

    const handleRemove = (index) => {
      removeCart(index);
    }

    const changeQuantity = (e, index) => {
      if(e.target.value===''){
        updateQuantity(index, 1);
      } else if(Number.isNaN(e.target.value)){
        updateQuantity(index, 1);
      } else {
        const num = parseInt(e.target.value, 0);
        if(num>1000){
          updateQuantity(index, 1000)
        } else {
          updateQuantity(index, num);
        }
      }
    }

    const continueShopping = (
      <div className="text-center py-4">
        <Link to={`/team/${team_id}/store/`} className="no-link">
          <Button variant="outline-secondary">Return to store</Button>
        </Link>
      </div>
    );

    const items = cart.map((elm, index) => {
      return (
        <Row key={`cart-item-${elm.item_id}-${elm.type}`} className="pt-3 d-flex align-items-center">
          <Col>
            {elm.name}
          </Col>
          <Col>
            {elm.type}
          </Col>
          <Col>
            <Form.Control 
              type="number"
              onChange={(e) => changeQuantity(e, index)}
              min={1}
              max={1000}
              value={elm.quantity}
            />
          </Col>
          <Col>
            $
            {(elm.quantity*elm.price).toFixed(2)}
          </Col>
          <Col>
            <Button variant="danger" onClick={() => handleRemove(index)}>Delete</Button>
          </Col>
        </Row>
      );
    });

    if(cart.length === 0){
      return (
        <>
          <Jumbotron className="text-center">
            <h2>
              There are no items in your cart!
            </h2>
          </Jumbotron>
          {continueShopping}
        </>
      );
    }

    return (
      <div>
        <Jumbotron className="text-center">

          <div>
            <h2 className="pb-2">Ready to checkout?</h2>
            <Link to={`/team/${team_id}/store/checkout`} className="no-link">
              <Button variant="outline-primary">Checkout</Button>
            </Link>
          </div>
          
        </Jumbotron>
        <div className="text-center">
          <Container>
            <Row className="pt-3 d-flex align-items-center h6">
              <Col>
                Name
              </Col>
              <Col>
                Type
              </Col>
              <Col>
                Quantity
              </Col>
              <Col>
                Price
              </Col>
              <Col>
                Delete
              </Col>
            </Row>
            { items }
          </Container>
        </div>
        {continueShopping}
      </div>
    );
};

export default Cart;
