/* eslint-disable */
import axios from 'axios';

export async function getPlayers(teamId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNTVmYTlmOC0xMzVmLTQ4ODItYjUwMS03MjVjMTE3NWFkNjkiLCJldmVudF9pZCI6IjhhNmE1NGU5LWRjOTAtNGUzNS04ZDE2LTJjMmMxODRhNGU4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMDgzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjIxMTk2MywiaWF0IjoxNjAyMjA4MzY0LCJqdGkiOiIzZGZkOGUzZS04YWU2LTQyMjgtYjE4My03ZGFkOTYyY2MzNzkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiYzU1ZmE5ZjgtMTM1Zi00ODgyLWI1MDEtNzI1YzExNzVhZDY5In0.JdQhs2_pIBeX6kcPp-5HQRqINBajfvdFVyZ7zkLoE93DEGKeXDtZ4W0czOC7OSCPudPl-K7-b4Bj-UJr7_3AoNYBvhD19r4qIhq7UoiOqHPatEfCB5zlbE80vMiHjU-r_UG8dk71v1d2schwqaZ3hHDefGeSvWqeIKRZIkiwbirdRfRU5hNjY0Syjs10PCp4ryHzt_5NIyorbj5xz0kCMRTFql-Np6ry-JBZoxi0Op785j4o0318NNmK2fuJULzlXBa9Ov0q23aaq7VelpKYhWc5Kz5AubNlxCINsSJJ1EFuw2-VfMTLprZmbMZATjxpgp24xb-xpzSvkYC9na52xg'
    }

    const data = {
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://52.91.140.102:8080/team/view/members',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}

export async function getTeamData(teamId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNTVmYTlmOC0xMzVmLTQ4ODItYjUwMS03MjVjMTE3NWFkNjkiLCJldmVudF9pZCI6IjhhNmE1NGU5LWRjOTAtNGUzNS04ZDE2LTJjMmMxODRhNGU4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMDgzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjIxMTk2MywiaWF0IjoxNjAyMjA4MzY0LCJqdGkiOiIzZGZkOGUzZS04YWU2LTQyMjgtYjE4My03ZGFkOTYyY2MzNzkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiYzU1ZmE5ZjgtMTM1Zi00ODgyLWI1MDEtNzI1YzExNzVhZDY5In0.JdQhs2_pIBeX6kcPp-5HQRqINBajfvdFVyZ7zkLoE93DEGKeXDtZ4W0czOC7OSCPudPl-K7-b4Bj-UJr7_3AoNYBvhD19r4qIhq7UoiOqHPatEfCB5zlbE80vMiHjU-r_UG8dk71v1d2schwqaZ3hHDefGeSvWqeIKRZIkiwbirdRfRU5hNjY0Syjs10PCp4ryHzt_5NIyorbj5xz0kCMRTFql-Np6ry-JBZoxi0Op785j4o0318NNmK2fuJULzlXBa9Ov0q23aaq7VelpKYhWc5Kz5AubNlxCINsSJJ1EFuw2-VfMTLprZmbMZATjxpgp24xb-xpzSvkYC9na52xg'
    }

    const data = {
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://52.91.140.102:8080/team/view/data',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}

export async function createTeam(name, ownerId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNTVmYTlmOC0xMzVmLTQ4ODItYjUwMS03MjVjMTE3NWFkNjkiLCJldmVudF9pZCI6IjhhNmE1NGU5LWRjOTAtNGUzNS04ZDE2LTJjMmMxODRhNGU4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMDgzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjIxMTk2MywiaWF0IjoxNjAyMjA4MzY0LCJqdGkiOiIzZGZkOGUzZS04YWU2LTQyMjgtYjE4My03ZGFkOTYyY2MzNzkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiYzU1ZmE5ZjgtMTM1Zi00ODgyLWI1MDEtNzI1YzExNzVhZDY5In0.JdQhs2_pIBeX6kcPp-5HQRqINBajfvdFVyZ7zkLoE93DEGKeXDtZ4W0czOC7OSCPudPl-K7-b4Bj-UJr7_3AoNYBvhD19r4qIhq7UoiOqHPatEfCB5zlbE80vMiHjU-r_UG8dk71v1d2schwqaZ3hHDefGeSvWqeIKRZIkiwbirdRfRU5hNjY0Syjs10PCp4ryHzt_5NIyorbj5xz0kCMRTFql-Np6ry-JBZoxi0Op785j4o0318NNmK2fuJULzlXBa9Ov0q23aaq7VelpKYhWc5Kz5AubNlxCINsSJJ1EFuw2-VfMTLprZmbMZATjxpgp24xb-xpzSvkYC9na52xg'
    }

    const data = {
        name: name,
        owner: ownerId
    }

    const config = {
        method: 'post',
        url: 'http://52.91.140.102:8080/team/create',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}

export async function editTeam(name, teamId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNTVmYTlmOC0xMzVmLTQ4ODItYjUwMS03MjVjMTE3NWFkNjkiLCJldmVudF9pZCI6IjhhNmE1NGU5LWRjOTAtNGUzNS04ZDE2LTJjMmMxODRhNGU4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMDgzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjIxMTk2MywiaWF0IjoxNjAyMjA4MzY0LCJqdGkiOiIzZGZkOGUzZS04YWU2LTQyMjgtYjE4My03ZGFkOTYyY2MzNzkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiYzU1ZmE5ZjgtMTM1Zi00ODgyLWI1MDEtNzI1YzExNzVhZDY5In0.JdQhs2_pIBeX6kcPp-5HQRqINBajfvdFVyZ7zkLoE93DEGKeXDtZ4W0czOC7OSCPudPl-K7-b4Bj-UJr7_3AoNYBvhD19r4qIhq7UoiOqHPatEfCB5zlbE80vMiHjU-r_UG8dk71v1d2schwqaZ3hHDefGeSvWqeIKRZIkiwbirdRfRU5hNjY0Syjs10PCp4ryHzt_5NIyorbj5xz0kCMRTFql-Np6ry-JBZoxi0Op785j4o0318NNmK2fuJULzlXBa9Ov0q23aaq7VelpKYhWc5Kz5AubNlxCINsSJJ1EFuw2-VfMTLprZmbMZATjxpgp24xb-xpzSvkYC9na52xg'
    }

    const data = {
        name: name,
        team: teamId
    }

    const config = {
        method: 'post',
        url: 'http://52.91.140.102:8080/team/edit',
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}

export async function joinTeam(teamId, userId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNTVmYTlmOC0xMzVmLTQ4ODItYjUwMS03MjVjMTE3NWFkNjkiLCJldmVudF9pZCI6IjhhNmE1NGU5LWRjOTAtNGUzNS04ZDE2LTJjMmMxODRhNGU4ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDIyMDgzNjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwMjIxMTk2MywiaWF0IjoxNjAyMjA4MzY0LCJqdGkiOiIzZGZkOGUzZS04YWU2LTQyMjgtYjE4My03ZGFkOTYyY2MzNzkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiYzU1ZmE5ZjgtMTM1Zi00ODgyLWI1MDEtNzI1YzExNzVhZDY5In0.JdQhs2_pIBeX6kcPp-5HQRqINBajfvdFVyZ7zkLoE93DEGKeXDtZ4W0czOC7OSCPudPl-K7-b4Bj-UJr7_3AoNYBvhD19r4qIhq7UoiOqHPatEfCB5zlbE80vMiHjU-r_UG8dk71v1d2schwqaZ3hHDefGeSvWqeIKRZIkiwbirdRfRU5hNjY0Syjs10PCp4ryHzt_5NIyorbj5xz0kCMRTFql-Np6ry-JBZoxi0Op785j4o0318NNmK2fuJULzlXBa9Ov0q23aaq7VelpKYhWc5Kz5AubNlxCINsSJJ1EFuw2-VfMTLprZmbMZATjxpgp24xb-xpzSvkYC9na52xg'
    }

    const data = {
        user: userId
    }

    const config = {
        method: 'post',
        url: `http://52.91.140.102:8080/team/join/${teamId}`,
        headers: headers,
        data: data
    }

    const res = await axios(config);

    console.log(res);
}