import networker from '../networker/networker';

/**
 * Returns the response body of the teams request.
 *
 * @param {String} user_id The uuid of the user.
 * @return {data} the contents of the response body of the teams request.
 */
export default async function getTeams(user_id) {
  const endpoint = 'http://54.235.234.147:8080/user/teams';

  const params = {
    id: user_id,
  };

  const response = await networker.get(endpoint, { params: { ...params } });
  if (response.status !== 200) {
    return null;
  }

  if (response.status !== 200) {
    return null;
  }

  const dict = { 0: 'Player', 1: 'Administrator', 2: 'Owner' };
  const teams = [];
  response.data.teams.map((team) =>
    teams.push({
      id: team.team_id,
      name: team.name,
      role: dict[team.privilege_level],
    })
  );
  console.log("teams from login",teams);
  return teams;
}
