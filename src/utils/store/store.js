/* eslint-disable no-unused-vars */
import networker from '../networker/networker';

const url = 'http://54.235.234.147:8080';
const headers = {
    'Content-Type': 'application/json'
}

export async function fetchItems(setItems, id) {

    const temp = [];
    for(let i=0; i<3; i+=1){
        const item = {
            item_id: i,
            name: 'T-Shirt',
            types: ['Small', 'Medium', 'etc'],
            picture: 'https://www.newjerseysbuy.com/wp-content/uploads/2020/01/cheap-nba-jerseys-free-shipping-Mitchell-Ness-Stephon-Marbury-Minnesota-Timberwolves-Hardwood-Classics-Throwback-NBA-Swingman-Jersey-inexpensive-sports-jerseys.jpg',
            price: 12.00,
            active: i%2
        }
        temp.push(item);
    }
    setItems(temp);
    const config = {
        method: 'get',
        url: `${url}/store/items/teamid?=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status===200){
            setItems(res.data);
        } else {
            return false;
        }
    } catch (err) {
        // TODO: Change to false
        return true;
    }
    return true;

}


export async function purchaseItems(buyer_info, items) {
    const data = { 
        ...buyer_info, 
        items: items
    }
    const config = {
        method: 'post',
        url: `${url}/store/order`,
        headers: headers,
        data: data
    }
    return false;
    // TODO: Link API
    // return networker(config);
}

export async function createItem(team_id, item) {
    const data = {
        ...item,
        team_id: team_id,
    }
    const config = {
        method: 'delete',
        url: `${url}/store/create`,
        headers: headers,
        data: data
    }
    return true;
    // TODO: Link API
    // return networker(config);
}

export async function updateItem(team_id, item) {
    const data = {
        ...item,
        team_id: team_id,
    }
    const config = {
        method: 'put',
        url: `${url}/store/update`,
        headers: headers,
        data: data
    }
    return true;
    // TODO: Link API
    // return networker(config);
}

export async function deleteItem(team_id, item_id) {
    const data = {
        team_id: team_id,
        item_id: item_id
    }
    const config = {
        method: 'delete',
        url: `${url}/store/delete`,
        headers: headers,
        data: data
    }
    return true;
    // TODO: Link API
    // return networker(config);
}
