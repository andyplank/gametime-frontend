import axios from 'axios';

const auth = 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4ZjVjOTZlOS0xZjJlLTQ3MjItOGRjOS04ODM5NWFmNTJlYTUiLCJldmVudF9pZCI6IjFlZGY0MmNkLTZiMjMtNDdjNC05NzIzLTYzOTc0M2Y0MWE3YyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMTk2MDQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjMwNjAwNCwiaWF0IjoxNjAyMjE5NjA1LCJqdGkiOiIzNDNlMzMwMC00MzgxLTQxY2EtYWFkZC01MzNhZmQxNjAwZjIiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiOGY1Yzk2ZTktMWYyZS00NzIyLThkYzktODgzOTVhZjUyZWE1In0.euLFGXaJc8FVMXMq7uB0XoywbPmDZSnxZup1WWzhMKrO_89UUD5AgNAthQKuuvyTWJ4fx4lEQWfrf_xWt6yWHs9eaXSdApqvO4OozpActgjBqzoWfISObtlOFgt8vADFqjOoQn8OoQx9GJGQhcsNuTou9YTv_wJLZkQ4MrF3KOjVR1cjRZpmlYSMPRIon5qajyvF3Kymhb6riT-XoIlxHxLLjGbzRWAAkqQ0s68Pkbp2Mu1mpVG2G9jK5pli8uhrCWCTrHZ29dOnl8DQLbQwVNL-tex5r_K20WJZ4OMqZ2t7PN6uTM9coWpUmm4Xs7ZnYt9l-BOH3-mwOKddWQJibQ';

export async function getPlayers(teamId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth
    }

    const data = {
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/view/members',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    return res.data;
}

export async function getTeamData(teamId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

    const data = {
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/view/data',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log("team data", res);
}

export async function getTeamsForUser(userId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

    const config = {
        method: 'get',
        url: `http://54.235.234.147:8080/user/teams?id=${userId}`,
        headers: headers,
    }

    const res = await axios(config);
    console.log("teams", res.data.teams)

    return res.data.teams;
}

export async function createTeam(ownerId, name) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

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

    const res = await axios(config);

    console.log(res);
}

export async function editTeam(teamId, name) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

    const data = {
        name: name,
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/team/edit',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log("edit team", res);
}

export async function joinTeam(teamId, userId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

    const data = {
        user: userId
    }

    const config = {
        method: 'post',
        url: `http://54.235.234.147:8080/team/join/${teamId}`,
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}

export async function removeFromTeam(teamId, userId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

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

    const res = await axios(config);

    console.log(res);
}

export async function editPermission(teamId, userId, permission) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth    }

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

    const res = await axios(config);

    console.log(res);
}