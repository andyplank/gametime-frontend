import axios from 'axios';
import cookie from 'js-cookie';

/**
 * Middleware for axios requests that adds relevant auth headers.
 */
axios.interceptors.request.use((config) => {
  // May additionally add a check to renew session token before continuing with request
  const access_token = cookie.get('access_token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export default axios;
