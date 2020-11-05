import networker from '../networker/networker';
import API_URL from '../API_URL';

const headers = {
  'Content-Type': 'application/json',
};

export async function getTeamData(teamId, playerId) {
  const data = {
    team: teamId,
    player: playerId,
  };

  const config = {
    method: 'post',
    url: `${API_URL}/team/view/data`,
    headers: headers,
    data: data,
  };

  const res = await networker(config);

  return res.data;
}

export async function createTeam(ownerId, name) {
  const data = {
    name: name,
    owner: ownerId,
  };

  const config = {
    method: 'post',
    url: `${API_URL}/team/create`,
    headers: headers,
    data: data,
  };

  const res = await networker(config);

  return res.data.team_id;
}

export async function editTeam(teamId, name) {
  const data = {
    team: teamId,
    name: name,
  };

  const config = {
    method: 'post',
    url: `${API_URL}/team/edit`,
    headers: headers,
    data: data,
  };

  const res = await networker(config);
  return res;
}

export async function joinTeam(teamId) {
  const config = {
    method: 'get',
    url: `${API_URL}/team/join/${teamId}`,
    headers: headers,
  };

  const res = await networker(config);
  return res;
}

export async function removeFromTeam(teamId, userId) {
  const data = {
    team: teamId,
    user: userId,
  };

  const config = {
    method: 'post',
    url: `${API_URL}/team/remove`,
    headers: headers,
    data: data,
  };

  const res = await networker(config);
  if (res.status !== 200) {
    return null;
  }
  return res;
}

export async function editPermission(teamId, userId, permission) {
  const data = {
    team: teamId,
    user: userId,
    priv: permission,
  };

  const config = {
    method: 'post',
    url: `${API_URL}/team/permissions`,
    headers: headers,
    data: data,
  };

  const res = await networker(config);
  return res;
}
