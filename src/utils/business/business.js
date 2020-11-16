import networker from '../networker/networker';
import API_URL from '../API_URL';

const headers = {
    'Content-Type': 'application/json'
}

export async function fetchSponsorships(setSponsorships, id) {
    const config = {
        method: 'get',
        url: `${API_URL}/sponsorships/?teamid=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        } 
        if(Array.isArray(res.data.sponsorships)){
            setSponsorships(res.data.sponsorships);
        }
        return true;
    } catch (err) {
        return false;
    }

}

export async function fetchPromotions(setPromotions, id) {
    const config = {
        method: 'get',
        url: `${API_URL}/promotions/?teamid=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        } 
        if(Array.isArray(res.data.promotions)){
            setPromotions(res.data.promotions);
        }
        return true;
    } catch (err) {
        return false;
    }

}


export async function createItem(team_id, item, types, picture) {
    const data = {
        ...item,
        team_id: team_id,
        types: types.map((elm) => {
            return elm.label;
        }),
        picture: picture
    }
    const config = {
        method: 'post',
        url: `${API_URL}/store/create`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}



export async function deleteSponsorship(team_id, sponsorship_id) {
    const data = {
        team_id: team_id,
        sponsorship_id: sponsorship_id
    }
    const config = {
        method: 'delete',
        url: `${API_URL}/sponsorship/delete`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function deletePromotion(team_id, promotion_id) {
    const data = {
        team_id: team_id,
        promotion_id: promotion_id
    }
    const config = {
        method: 'delete',
        url: `${API_URL}/promotion/delete`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

