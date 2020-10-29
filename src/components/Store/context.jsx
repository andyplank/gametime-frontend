import { createContext } from 'react';

const StoreContext = createContext({
    items: [],
    cart: [],
    addCart: () => {},
    removeCart: () => {},
    updateCart: () => {}
});

export default StoreContext;
