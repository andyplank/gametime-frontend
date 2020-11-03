import cookie from 'js-cookie';
import networker from '../networker/networker';

/**
 * Returns the response body of the authentication request.
 *
 * @param {String} email The provided email address.
 * @param {number} password The provided password.
 * @return {data} the contents of the response body of the auth request.
 */
export default async function login(email, password) {
  const endpoint = 'https://gametime-server.hubermjonathan.com:8080/login';

  const body = {
    email: email,
    password: password,
  };

  try {
    const response = await networker.post(endpoint, body);
    const { success, error, message, data } = response.data;

    // If something went wrong with request, then no session is provided
    if (success && !error) {
      const { access_token, expires_in } = data;
      if (access_token != null && expires_in != null) {
        const expiration = new Date(Date.now() + expires_in * 1000);
        cookie.set('access_token', access_token, { expires: expiration });
      }
    }

    return {
      success: success,
      error: error,
      message: message,
    };
  } catch (e) {
    // Assume non-2xx status code is un-recoverable
    return {
      success: false,
      error: true,
      message: 'An unexpected server error occurred. Please try again later',
    };
  }
}

// /**
//  * Attempts to renew session token with refresh token if possible
//  *
//  * @return {bool} whether the operation succeeded or not.
//  */
// export async function reauthenticate() {
//   const endpoint = '';

//   const { id_token, access_token, refresh_token } = getTokens();

//   // If any of the three tokens are null, no need to proceed.
//   if (!id_token || !access_token || !refresh_token) {
//     // Clear cookies?
//     return false;
//   }

//   const expires_at = getExpiration();

//   // If token expired, it cannot be refreshed
//   if (Date.now() / 1000 > expires_at) {
//     // Clear cookies?
//     return false;
//   }

//   const body = {
//     id_token: id_token,
//     access_token: access_token,
//     refresh_token: refresh_token,
//   };

//   const response = await networker.post(endpoint, body);

//   if (response.status !== 200) {
//     return false;
//   }

//   // Extract new tokens from successful response body
//   const { new_session_id, new_refresh_token } = response.body;
//   if (!new_session_id || new_refresh_token) {
//     return false;
//   }

//   setTokens(new_session_id, new_refresh_token);
//   return true;
// }

// /**
//  * Stores id, access, and refresh tokens as browser cookies.
//  *
//  * @param {String} id_token The provided id token.
//  * @param {String} access_token The provided access token.
//  * @param {String} refresh_token The provided refresh token.
//  */
// export function setTokens(id_token, access_token, refresh_token) {
//   cookie.set('id_token', id_token);
//   cookie.set('access_token', access_token);
//   cookie.set('refresh_token', refresh_token);
// }

// /**
//  * Retrieves id, access, and refresh tokens from browser cookies.
//  *
//  * @return {object} A triple containing key->value pairs of tokens
//  */
// export function getTokens() {
//   return {
//     id_token: cookie.get('id_token'),
//     access_token: cookie.get('access_token'),
//     refresh_token: cookie.get('refresh_token'),
//   };
// }

// /**
//  * Stores epoch timestamp of token expiration as browser cookie.
//  *
//  * @param {number} delay The number of seconds until expiration (in seconds).
//  */
// export function setExpiration(delay) {
//   const epoch = Date.now() / 1000;
//   cookie.set('expires_at', epoch + delay);
// }

// /**
//  * Retrieves epoch timestamp of token expiration from browser cookie.
//  *
//  * @return {number} The epoch time at which the token expires.
//  */
// export function getExpiration() {
//   return cookie.get('expires_at');
// }

// // TODO: Expirations of cookies should be passed with the cookie so that the browser handles it for us
// // TODO: Non-'https-only' cookies and 'Authorization' header makes us more vulnerable to XSS and CSRF attacks
