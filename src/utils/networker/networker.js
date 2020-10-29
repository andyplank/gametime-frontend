/* eslint-disable */
import axios from 'axios';
import cookie from 'js-cookie';

/**
 * Middleware for axios requests that adds relevant auth headers.
 */
axios.interceptors.request.use((config) => {
  // May additionally add a check to renew session token before continuing with request
  config.headers.Authorization = 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0YjZkMjAwYy02ZjVhLTRiYzYtYWYzMy01OWEyMjRmYjA5ODUiLCJjb2duaXRvOmdyb3VwcyI6WyJQbGF5ZXIiXSwiZXZlbnRfaWQiOiI3NmM2ODBlYS02NjYxLTQxZTMtYWI0ZS0wMDlhMjU2MmI3ZWQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjA0MDExNTUwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9XMEV0bWR4NHMiLCJleHAiOjE2MDQwOTc5NTAsImlhdCI6MTYwNDAxMTU1MCwianRpIjoiNjFhMWI5OWUtZjUyYy00NjdlLTgxMTktOWM1NjQxY2ZmZDIyIiwiY2xpZW50X2lkIjoiN3VkMXFydThldTJvMXZodDZvbzZwaHV0bnUiLCJ1c2VybmFtZSI6IjRiNmQyMDBjLTZmNWEtNGJjNi1hZjMzLTU5YTIyNGZiMDk4NSJ9.Vkgh8iMZkuLLJTI92SBOJwOt97kn221ln3s06gfwWzKwGdSlA8-E0L5dMqzv04o6VKAjPmoQUvyGTHPE16fRF4UHCfsQAvBN_Skvq_IR-J3sPOtPX1PM1Gp_sy4KIeYBLnMCcg7PNNb5L_VZ1QvI9fBWnv1lZmZHz29NA07vF4Cin6QoHKs0RpIYKO-X7shzdsjUCCmB_R1cP6Xq2MFHZj7N7nUvIhnIL-F-87KC8pHQPcW2VOYMmAmGIawGTTMc2MyFkDvU8YzxkU1P7qW0vVXpwjvnmKJChUl7Eaa-H_rPsROFIJTXtKMlQZZzgHVR8YyOumqhN_xcE9depioKfQ';
  return config;
  const access_token = cookie.get('access_token');
  if (access_token) {
    config.headers.Authorization = access_token;
  }
  return config;
});

export default axios;
