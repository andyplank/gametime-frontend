import cookie from 'js-cookie';
import networker from '../networker/networker';

/**
 * Returns the response body of the authentication request.
 *
 * @param {String} email The provided email address.
 * @param {number} password The provided password.
 * @return {data} the contents of the response body of the auth request.
 */
export async function authenticate(email, password) {
  const endpoint = 'http://54.235.234.147:8080/login';

  const body = {
    email: email,
    password: password,
  };
  const response = await networker.post(endpoint, body);

  if (response.status !== 200) {
    return null;
  }

  const { success, error, message, user_id } = response.data;

  if (success && !error) {
    const {
      id_token,
      refresh_token,
      access_token,
      expires_in,
    } = response.data.data;

    setTokens(id_token, refresh_token, access_token);
    setExpiration(expires_in);

    return {
      user_id: user_id,
      message: message,
      error: error,
      success: success,
    };
  }

  return {
    message: message,
    error: error,
    success: success,
  };
}

/**
 * Attempts to renew session token with refresh token if possible
 *
 * @return {bool} whether the operation succeeded or not.
 */
export async function reauthenticate() {
  const endpoint = '';

  const { id_token, access_token, refresh_token } = getTokens();

  // If any of the three tokens are null, no need to proceed.
  if (!id_token || !access_token || !refresh_token) {
    // Clear cookies?
    return false;
  }

  const expires_at = getExpiration();

  // If token expired, it cannot be refreshed
  if (Date.now() / 1000 > expires_at) {
    // Clear cookies?
    return false;
  }

  const body = {
    id_token: id_token,
    access_token: access_token,
    refresh_token: refresh_token,
  };

  const response = await networker.post(endpoint, body);

  if (response.status !== 200) {
    return false;
  }

  // Extract new tokens from successful response body
  const { new_session_id, new_refresh_token } = response.body;
  if (!new_session_id || new_refresh_token) {
    return false;
  }

  setTokens(new_session_id, new_refresh_token);
  return true;
}

/**
 * Stores id, access, and refresh tokens as browser cookies.
 *
 * @param {String} id_token The provided id token.
 * @param {String} access_token The provided access token.
 * @param {String} refresh_token The provided refresh token.
 */
export function setTokens(id_token, access_token, refresh_token) {
  cookie.set('id_token', id_token);
  cookie.set('access_token', access_token);
  cookie.set('refresh_token', refresh_token);
}

/**
 * Retrieves id, access, and refresh tokens from browser cookies.
 *
 * @return {object} A triple containing key->value pairs of tokens
 */
export function getTokens() {
  return {
    id_token: cookie.get('id_token'),
    access_token: cookie.get('access_token'),
    refresh_token: cookie.get('refresh_token'),
  };
}

/**
 * Stores epoch timestamp of token expiration as browser cookie.
 *
 * @param {number} delay The number of seconds until expiration (in seconds).
 */
export function setExpiration(delay) {
  const epoch = Date.now() / 1000;
  cookie.set('expires_at', epoch + delay);
}

/**
 * Retrieves epoch timestamp of token expiration from browser cookie.
 *
 * @return {number} The epoch time at which the token expires.
 */
export function getExpiration() {
  return cookie.get('expires_at');
}

// TODO: Expirations of cookies should be passed with the cookie so that the browser handles it for us
// TODO: Non-'https-only' cookies and 'Authorization' header makes us more vulnerable to XSS and CSRF attacks
