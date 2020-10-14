import React, {useState} from 'react';

import Header from '../Header/Header';

import StoreContext from './context';

import './Store.scss';

const Store = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
    const [cart, setCart] = useState([]);

    const addCart = (item) => {
        const temp = cart;
        temp.push(item);
        setCart(item);
    };

    const removeCart = (item) => {
        const temp = cart;
        const index = temp.indexOf(item);
        if (index > -1) {
          temp.splice(index, 1);
          setCart(temp);
        }
    };

    return (
      <div>
        <StoreContext.Provider
          value={{
                cart,
                addCart,
                removeCart,
                setCart
            }}
        >
          Store
        </StoreContext.Provider>
      </div>
    );
};

export default Store;
