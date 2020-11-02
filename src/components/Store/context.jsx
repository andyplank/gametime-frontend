import { createContext } from 'react';

const StoreContext = createContext({
    items: [],
    cart: [],
    addCart: () => {},
    removeCart: () => {},
    updateCart: () => {},
    updateQuantity: () => {}
});

export default StoreContext;
