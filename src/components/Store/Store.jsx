import React, {useState, useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

import { Route, Switch, Redirect, Link, useParams } from 'react-router-dom';

import StoreContext from './context';
import Cart from './Cart';
import ItemGrid from './ItemGrid';
import Purchase from './Purchase';

import {fetchItems} from '../../utils/store/store'


import './Store.scss';

const Store = () => {
    
  const { teamId } = useParams();

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLen, setcartLen] = useState(0);

  const refresh = () => {
    fetchItems(setItems, teamId);
    console.log(items);
    console.log(teamId);
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

  const removeCart = (item) => {
      const temp = cart;
      const index = temp.indexOf(item);
      if (index > -1) {
        temp.splice(index, 1);
        setcartLen(temp.length);
        setCart(temp);
      }
  };

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
        <div className="wrap">
          <div className="absolute">
            <Link to={`/${teamId}/store/cart`} className="no-link">
              <Badge badgeContent={cartLen} showZero color="primary">
                <ShoppingCartRoundedIcon fontSize="large" />
              </Badge>
            </Link>
          </div>
        </div>
          
        <Switch>
          <Route path="/:teamId/store/item/:id" component={Purchase} />
          <Route path="/:teamId/store/cart/" exact component={Cart} />
          <Route path="/:teamId/store" exact component={ItemGrid} props={{teamId: teamId}} />
          <Route component={() => (<Redirect to={{ pathname: `/${teamId}/store` }} />)} />
        </Switch>
      </StoreContext.Provider>
    </div>
  );
};

export default Store;
