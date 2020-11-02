import React, {useState, useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

import { Route, Switch, Redirect, Link, useParams, useLocation } from 'react-router-dom';

import StoreContext from './context';
import Cart from './Cart';
import ItemGrid from './ItemGrid';
import ItemDetails from './ItemDetails';
import ItemForm from './ItemForm';
import CheckOut from './CheckOut';

import { fetchItems } from '../../utils/store/store'

import './Store.scss';

const Store = () => {
    
  const { teamId } = useParams();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLen, setCartLen] = useState(0);

  const refresh = () => {
    fetchItems(setItems, teamId);
  }

  useEffect(() => {
    refresh();
  }, [teamId])

  const addCart = (item) => {
    const temp = [...cart];
    const index = temp.findIndex((elm) => {
      return elm.item_id === item.item_id && elm.type === item.type
    });
    if(index !== -1) {
      temp[index].quantity += 1;
    } else {
      const newItem = {...item};
      newItem.quantity = 1
      temp.push(newItem);
    }
    setCartLen(temp.length);
    setCart(temp);
  };

  const updateQuantity = (index, quantity) => {
    if(index < cart.length){
      const temp = [...cart];
      temp[index].quantity = quantity;
      setCart(temp);
    }
  }

  const removeCart = (index) => {
      const temp = [...cart];
      temp.splice(index, 1);
      setCartLen(temp.length);
      setCart(temp);
  };

  const updateCart = (newCart) => {
    if(Array.isArray(newCart)){
      setCartLen(newCart.length);
      setCart(newCart);
    }
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
            updateCart,
            updateQuantity
          }}
      >
        {location.pathname!==`/${teamId}/store/cart` && shoppingCartBadge}
         
        <Switch>
          <Route path="/:teamId/store/edit" component={ItemForm} />
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
