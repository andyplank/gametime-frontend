import React, {useContext} from 'react';
import { Jumbotron, Button  } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import StoreContext from './context';

const Cart = () => {

    const { cart, removeCart } = useContext(StoreContext);
    const { teamId }  = useParams();

    const handleRemove = (item) => {
      removeCart(item);
    }

    const items = cart.map((elm, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`cart-item-${index}`}>
        {elm.name}
        {elm.type}
        {elm.price}
        <Button onClick={() => handleRemove(elm)}>Remove</Button>
      </div>
    ));

    return (
      <div>
        <Jumbotron className="text-center">
          <h2>Your Cart</h2>
        </Jumbotron>
        <div className="text-center">
          {cart.length !== 0 ? items : (
            <h2>
              There are no items in your cart!
            </h2>
          )}
        </div>
        <div className="text-center py-4">
          <Link to={`/${teamId}/store/`} className="no-link"><h5>Return to store</h5></Link>

        </div>
      </div>
    );
};

export default Cart;
