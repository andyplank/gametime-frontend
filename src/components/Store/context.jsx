import { createContext } from 'react';

const StoreContext = createContext({
    cart: [],
    addCart: () => {},
    removeCart: () => {},
    updateCart: () => {}
});

export default StoreContext;
