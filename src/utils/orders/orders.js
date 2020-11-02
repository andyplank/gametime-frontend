import networker from '../networker/networker';

export default async function getOrders(teamId) {
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team_id: teamId
    }

    const config = {
        method: 'post',
        url: 'http://54.235.234.147:8080/store/status',
        headers: headers,
        data: data
    }

    const res = await networker(config);
    console.log(res.data);
    return res;
  }
  