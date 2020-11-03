import networker from '../networker/networker';

const url = 'https://gametime-server.hubermjonathan.com:8080/';
const headers = {
    'Content-Type': 'application/json'
}

export default async function fetchTeams(setTeams) {
    const config = {
        method: 'get',
        url: `${url}/team/view/all`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        setTeams(res.data.teams);
        return true;
    } catch (err) {
        return false;
    }
}
