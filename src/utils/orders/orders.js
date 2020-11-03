import networker from '../networker/networker';

export async function getOrders(teamId) {
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
    return res.data.transactions;
}
  

export async function setOrderStatus(orderId, status) {
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        order_id: orderId,
        status: status
    }

    const config = {
        method: 'put',
        url: 'http://54.235.234.147:8080/store/status',
        headers: headers,
        data: data
    }

    const res = await networker(config);
    if(res.status === 200){
        return res;
    }
    return null;
    
}