import networker from '../networker/networker';

/**
 * Returns the response body of the user request.
 *
 * @param {String} user_id The uuid of the user.
 * @return {data} the contents of the response body of the user request.
 */
export async function getUser(user_id) {
  const endpoint = 'http://54.235.234.147:8080/user';

  const params = {
    id: user_id,
  };

  const response = await networker.get(endpoint, { params: { ...params } });

  if (response.status !== 200) {
    return null;
  }

  console.log(response)

  const user = {
    id: response.data.user_id,
    first_name: response.data.first_name,
    last_name: response.data.last_name,
    email_address: response.data.email,
    default_phone_number: response.data.phone_number,
    optional_phone_numbers: response.data.extra_phone_numbers,
    teams: response.data.teams
  };

  return user;
}

/**
 * Adds a phone number to a particular user account
 *
 * @param {String} user_id The uuid of the user.
 * @param {String} phone_number The phone number to be added to the user's list.
 * @return {message} whether or not the request succeeded.
 */
export async function addPhoneNumber(user_id, phone_number) {
  const endpoint = 'http://54.235.234.147:8080/user/phone/add';

  const data = {
    id: user_id,
    phone: phone_number,
  };
  try {
    await networker.post(endpoint, data);
    return '';
  } catch (e) {
    return e.response.data.reason;
  }
  // TODO: Return success and error in response body from server
}

/**
 * Removes an existing phone number from a particular user account
 *
 * @param {String} user_id The uuid of the user.
 * @param {String} phone_number The phone number to be from the user's list.
 * @return {bool} whether or not the request succeeded.
 */
export async function removePhoneNumber(user_id, phone_number) {
  const endpoint = 'http://54.235.234.147:8080/user/phone/remove';

  const data = {
    id: user_id,
    phone: phone_number,
  };

  const response = await networker.post(endpoint, data);

  if (response.status !== 200) {
    return false;
  }

  // TODO: Return success and error in response body from server

  return true;
}
