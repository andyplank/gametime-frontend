import networker from '../networker/networker';

export async function getTeamData(teamId, playerId) {
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team: teamId,
        player: playerId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/view/data',
        headers: headers,
        data: data
    }

    const res = await networker(config);

    return res.data;
}

export async function createTeam(ownerId, name) {
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        name: name,
        owner: ownerId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/create',
        headers: headers,
        data: data
    }

    const res = await networker(config);

    return res.data.team_id;
}

export async function editTeam(teamId, name) {
    const headers = {
        'Content-Type': 'application/json',
    }

    const data = {
        team: teamId,
        name: name
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/edit',
        headers: headers,
        data: data
    }

    const res = await networker(config);
    return res;
}

export async function joinTeam(teamId) {
    const headers = {
        'Content-Type': 'application/json',
    }

    const config = {
        method: 'get',
        url: `http://54.235.234.147:8080/team/join/${teamId}`,
        headers: headers
    }

    const res = await networker(config);
    return res;

}

export async function removeFromTeam(teamId, userId) {
    const headers = {
        'Content-Type': 'application/json',
    }

    const data = {
        team: teamId,
        user: userId
    }

    const config = {
        method: 'post',
        url: `http://54.235.234.147:8080/team/remove`,
        headers: headers,
        data: data
    }

    const res = await networker(config);
    if(res.status !== 200){
        return null;
    }
    return res;
}

export async function editPermission(teamId, userId, permission) {
    const headers = {
        'Content-Type': 'application/json',
    }

    const data = {
        team: teamId,
        user: userId,
        priv: permission
    }

    const config = {
        method: 'post',
        url: `http://54.235.234.147:8080/team/permissions`,
        headers: headers,
        data: data
    }

    const res = await networker(config);
    return res;
}
