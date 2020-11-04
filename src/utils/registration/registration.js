import networker from '../networker/networker';
import API_URL from '../API_URL';

/**
 * Returns the status of the registration request.
 *
 * @param {Object} data The required registration key->value pairs.
 * @return {data} the contents of the response body of the register request.
 */
export async function register(data) {
  const endpoint = `${API_URL}/signup`;

  const body = {
    firstname: data.first_name,
    lastname: data.last_name,
    email: data.email_address,
    phone: data.phone_number,
    password: data.password,
  };
  const response = await networker.post(endpoint, body);

  if (response.status !== 200) {
    return {
      message: 'Something went wrong, please try again later',
      error: true,
      success: false,
    };
  }

  const { message, error, success } = response.data;
  return {
    message: message,
    error: error,
    success: success,
  };
}

/**
 * Returns the status of the verification request.
 *
 * @param {Object} data The required verification key->value pairs.
 * @return {data} the contents of the response body of the verification request.
 */
export async function verify(data) {
  const endpoint =
    'https://1sz21h77li.execute-api.us-east-2.amazonaws.com/Dev/verify';

  const body = {
    email: data.email,
    password: data.password,
    code: data.code,
  };
  const response = await networker.post(endpoint, body);

  if (response.status !== 200) {
    return {
      message: 'Something went wrong, please try again later',
      error: true,
      success: false,
    };
  }

  const { message, error, success } = response.data;
  return {
    message: message,
    error: error,
    success: success,
  };
}
