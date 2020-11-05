import networker from '../networker/networker';
import API_URL from '../API_URL';

const headers = {
    'Content-Type': 'application/json'
}

export default async function fetchTeams(setTeams) {
    const config = {
        method: 'get',
        url: `${API_URL}/team/view/all`,
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
