import networker from '../networker/networker';

const url = 'https://gametime-server.hubermjonathan.com:8080/';
const headers = {
  'Content-Type': 'application/json',
};
// Fix later
const team_id = 1;

export async function createGroup(groupName, groupMembers) {
  const data = {
    name: groupName,
    team_id: team_id,
    member_ids: groupMembers,
  };
  const config = {
    method: 'post',
    url: `${url}/group`,
    headers: headers,
    data: data,
  };
  try {
    await networker(config);
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateMembers(selected, initMembers, groupMembers) {
  try {
    const u1 = await addMembers(selected, initMembers, groupMembers);
    const u2 = await removeMembers(selected, initMembers, groupMembers);
    if (u1.status === 200 && u2.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function addMembers(selected, initMembers, groupMembers) {
  const data = {
    group_id: selected.group_id,
    new_members: groupMembers.filter((elm) => !initMembers.includes(elm)),
  };
  const config = {
    method: 'put',
    url: `${url}/group/addMembers`,
    headers: headers,
    data: data,
  };
  return networker(config);
}

export async function removeMembers(selected, initMembers, groupMembers) {
  const data = {
    group_id: selected.group_id,
    remove_members: initMembers.filter((elm) => !groupMembers.includes(elm)),
  };
  const config = {
    method: 'delete',
    url: `${url}/group/deleteMembers`,
    headers: headers,
    data: data,
  };
  return networker(config);
}

export async function fetchMembers(setMembers) {
  const data = {
    team: 1,
  };
  const config = {
    method: 'post',
    url: `${url}/team/view/data`,
    headers: headers,
    data: data,
  };
  try {
    const res = await networker(config);
    if (res.status === 200) {
      setMembers(res.data.users);
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function fetchGroups(setGroups) {
  const data = {
    team: team_id,
  };
  const config = {
    method: 'get',
    url: `${url}/team/view/groups?id=${team_id}`,
    headers: headers,
    data: data,
  };
  try {
    const res = await networker(config);
    if (res.status === 200) {
      setGroups(res.data.groups);
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function sendGroupMessage(sender_id, group_id, message) {
  const data = {
    sender_id: sender_id,
    group_id: group_id,
    message: message,
  };
  const config = {
    method: 'post',
    url: `${url}/sendGroupMessage`,
    headers: headers,
    data: data,
  };
  try {
    const res = await networker(config);
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function sendPlayerMessage(recepientID, message) {
  const data = {
    sender_id: 1,
    recipient_id: recepientID,
    message: message,
  };

  const config = {
    method: 'post',
    url: `${url}/sendPlayerMessage`,
    headers: headers,
    data: data,
  };
  try {
    const res = await networker(config);
    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}
