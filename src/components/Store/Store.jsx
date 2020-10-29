import React, {useState, useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

import { Route, Switch, Redirect, Link, useParams, useLocation } from 'react-router-dom';

import StoreContext from './context';
import Cart from './Cart';
import ItemGrid from './ItemGrid';
import ItemDetails from './ItemDetails';
import CheckOut from './CheckOut';

import { fetchItems } from '../../utils/store/store'


import './Store.scss';

const Store = () => {
    
  const { teamId } = useParams();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLen, setcartLen] = useState(0);

  const refresh = () => {
    fetchItems(setItems, teamId);
  }

  useEffect(() => {
    refresh();
  }, [teamId])

  const addCart = (item) => {
      const temp = cart;
      temp.push(item);
      setcartLen(temp.length);
      setCart(temp);
  };

  const removeCart = (index) => {
      const temp = cart;
      temp.splice(index, 1);
      setcartLen(temp.length);
      setCart(temp);
  };

  const shoppingCartBadge = (
    <div className="wrap">
      <div className="absolute">
        <Link to={`/${teamId}/store/cart`} className="no-link">
          <Badge badgeContent={cartLen} showZero color="primary">
            <ShoppingCartRoundedIcon fontSize="large" />
          </Badge>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="fill-vert">
      <StoreContext.Provider
        value={{
            items,
            cart,
            addCart,
            removeCart,
            setCart
          }}
      >
        {location.pathname!==`/${teamId}/store/cart` && shoppingCartBadge}
         
        <Switch>
          <Route path="/:teamId/store/item/:id" component={ItemDetails} />
          <Route path="/:teamId/store/cart/" exact component={Cart} />
          <Route path="/:teamId/store/checkout/" exact component={CheckOut} />
          <Route path="/:teamId/store" exact component={ItemGrid} />
          <Route component={() => (<Redirect to={{ pathname: `/${teamId}/store` }} />)} />
        </Switch>
      </StoreContext.Provider>
    </div>
  );
};

export default Store;
