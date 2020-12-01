import {loadStripe} from '@stripe/stripe-js';
import networker from '../networker/networker';
import API_URL from '../API_URL';


const headers = {
    'Content-Type': 'application/json'
}

export async function addBank(team_id, name, routing, account){
    const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const token = await stripe.createToken('bank_account', {
        bank_account: {
            country: 'US',
            currency: 'usd',
            account_holder_name: name,
            account_holder_type: 'individual',
            routing_number: routing,
            account_number: account,
        },
    });
    console.log(token);
    console.log(team_id);
    if(token.error){
        return false;
    }
    return true;
}

export async function contact(team_id, name, email, text) {
    const data = {
        team_id: team_id,
        subject: 'Research Opportunity',
        body: `Name: ${name}\r\nEmail: ${email}\r\nMessage: ${text}`
    }
    const config = {
        method: 'post',
        url: `${API_URL}/sponsors/contact`,
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

export async function fetchSponsorships(setSponsors, id) {
    const config = {
        method: 'get',
        url: `${API_URL}/sponsors?team_id=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        } 
        if(Array.isArray(res.data.sponsors)){
            setSponsors(res.data.sponsors);
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function fetchPromotions(setPromotions, id) {
    const config = {
        method: 'get',
        url: `${API_URL}/promotions?team_id=${id}`,
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


export async function createSponsor(team_id, name, picture) {
    const data = {
        name: name,
        team_id: team_id,
        picture: picture
    }
    const config = {
        method: 'post',
        url: `${API_URL}/sponsors`,
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

const parseTime = (datestring) => {
    return new Date(datestring).getTime() / 1000
}

export async function createPromotion(team_id, name, description, start, end, picture) {
    const data = {
        name: name,
        description: description,
        team_id: team_id,
        start_time: parseTime(start),
        end_time: parseTime(end),
        picture: picture
    }
    const config = {
        method: 'post',
        url: `${API_URL}/promotions`,
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

export async function deleteSponsorship(team_id, sponsor_id) {
    const data = {
        team_id: team_id,
        sponsor_id: sponsor_id
    }
    const config = {
        method: 'delete',
        url: `${API_URL}/sponsors`,
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
        url: `${API_URL}/promotions`,
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

