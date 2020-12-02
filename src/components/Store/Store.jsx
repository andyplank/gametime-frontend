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
import SuccessPurchase from './SuccessPurchase';

import { fetchItems } from '../../utils/store/store'

import './Store.scss';

const Store = () => {
    

  const { team_id } = useParams();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLen, setCartLen] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    await fetchItems(setItems, team_id);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, [team_id])

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
      temp[index].quantity = parseInt(quantity, 0);
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
        <Link to={`/team/${team_id}/store/cart`} className="no-link">
          <Badge badgeContent={cartLen} showZero color="primary">
            <ShoppingCartRoundedIcon style={{color: 'black'}} fontSize="large" />
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
        {location.pathname!==`/${team_id}/store/cart` && shoppingCartBadge}
        {!loading && (
          <Switch>
            <Route path="/team/:team_id/store/edit" component={ItemForm} />
            <Route path="/team/:team_id/store/item/:itemId" component={ItemDetails} />
            <Route path="/team/:team_id/store/cart/" exact component={Cart} />
            <Route path="/team/:team_id/store/checkout/" exact component={CheckOut} />
            <Route path="/team/:team_id/store/success/" exact component={SuccessPurchase} />
            <Route path="/team/:team_id/store" exact component={ItemGrid} />
            <Route component={() => (<Redirect to={{ pathname: `/team/${team_id}/store` }} />)} />
          </Switch>
        )}
      </StoreContext.Provider>
    </div>
  );
};

export default Store;
