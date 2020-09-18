import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
});

export default AuthContext;
