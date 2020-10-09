import networker from '../networker/networker';

/**
 * Returns the response body of the user request.
 *
 * @param {String} user_id The uuid of the user.
 * @return {data} the contents of the response body of the user request.
 */
export default async function getUser(user_id) {
  const endpoint = 'http://52.91.140.102:8080/user';

  const params = {
    id: user_id,
  };

  const response = await networker.get(endpoint, { params: { ...params } });

  if (response.status !== 200) {
    return null;
  }

  const user = {
    id: response.data.user_id,
    first_name: response.data.name.split(' ')[0],
    last_name: response.data.name.split(' ')[1],
    email_address: response.data.email,
    default_phone_number: response.data.phone_number,
    optional_phone_numbers: response.data.extra_phone_numbers,
  };

  return user;
}
